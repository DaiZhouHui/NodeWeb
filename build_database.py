#!/usr/bin/env python3
"""
build_database.py - 三级精度差异化构建器
层级1: 核心8国/地区 - 高精度 (温和合并)
层级2: 次要10国 - 中等精度 (适度合并)
层级3: 其余所有 - 低精度 (超级合并为‘ZZ’)
"""

import csv, json, os, shutil, sys
from urllib.request import urlopen
from ipaddress import ip_network
from datetime import datetime, timezone
MAXMIND_LICENSE_KEY = os.environ.get("MAXMIND_LICENSE_KEY", "")

# 添加检查，如果密钥为空则报错
if not MAXMIND_LICENSE_KEY:
    print("❌ 错误：未找到MaxMind许可证密钥。")
    print("   请设置 MAXMIND_LICENSE_KEY 环境变量。")
    print("   本地测试：在.env文件中设置，或运行前执行 export MAXMIND_LICENSE_KEY=你的密钥")
    print("   GitHub Actions：已在仓库Secrets中设置")
    sys.exit(1)

OUTPUT_JSON = "database.json"  # 固定文件名，与前端匹配
TEMP_DIR = "temp_tiered_data"

# ====== 三级精度配置 ======
# 第一层级：核心8国/地区 (高精度，温和合并)
TIER1_COUNTRIES = {
    'CN',  # 中国
    'HK',  # 中国香港
    'JP',  # 日本
    'KR',  # 韩国
    'US',  # 美国
    'AU',  # 澳大利亚
    'NZ',  # 新西兰
    'SG',  # 新加坡
}

# 第二层级：次要10国 (中等精度，适度激进合并)
TIER2_COUNTRIES = {
    'DE',  # 德国
    'GB',  # 英国
    'FR',  # 法国
    'RU',  # 俄罗斯
    'IN',  # 印度
    'CA',  # 加拿大
    'IT',  # 意大利
    'NL',  # 荷兰
    'TW',  # 中国台湾
    # 注意：已移除 'BR' (巴西)
}

OTHER_COUNTRY_CODE = 'ZZ'  # 第三层级：其余所有国家

def download_and_extract():
    """下载并提取数据"""
    print("[1] 下载数据...")
    os.makedirs(TEMP_DIR, exist_ok=True)
    download_url = f"https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-Country-CSV&license_key={MAXMIND_LICENSE_KEY}&suffix=zip"
    zip_path = os.path.join(TEMP_DIR, "source.zip")
    
    try:
        with urlopen(download_url) as res, open(zip_path, 'wb') as f:
            shutil.copyfileobj(res, f)
        shutil.unpack_archive(zip_path, TEMP_DIR)
        
        for item in os.listdir(TEMP_DIR):
            if item.startswith("GeoLite2-Country-CSV_"):
                csv_dir = os.path.join(TEMP_DIR, item)
                return (
                    os.path.join(csv_dir, "GeoLite2-Country-Blocks-IPv4.csv"),
                    os.path.join(csv_dir, "GeoLite2-Country-Locations-zh-CN.csv")
                )
    except Exception as e:
        print(f"    ❌ 失败: {e}")
        raise Exception(f"下载或解压失败: {e}")

def tiered_merge_ranges(ranges, tier_level):
    """
    根据层级采用不同的合并策略
    tier_level: 1=高精度, 2=中精度, 3=低精度
    """
    if not ranges:
        return []
    
    ranges.sort()
    merged = []
    cs, ce = ranges[0]
    
    for s, e in ranges[1:]:
        if tier_level == 1:
            # 层级1：高精度，只合并直接相邻的
            merge_threshold = 1
        elif tier_level == 2:
            # 层级2：中精度，允许小间隙 (约1024个C类网段)
            merge_threshold = 262144
        else:
            # 层级3：低精度，允许超大间隙 (约65536个C类网段)
            merge_threshold = 16777216
        
        if s - ce <= merge_threshold:
            if e > ce:
                ce = e
        else:
            merged.append((cs, ce))
            cs, ce = s, e
    
    merged.append((cs, ce))
    return merged

def main():
    print("=" * 60)
    print("三级精度差异化IP数据库构建器")
    print("=" * 60)
    print(f"第一层级 (核心8国): {sorted(TIER1_COUNTRIES)}")
    print(f"第二层级 (次要10国): {sorted(TIER2_COUNTRIES)}")
    print(f"第三层级 (其余所有): '{OTHER_COUNTRY_CODE}'")
    print("=" * 60)
    
    if "YOUR_MAXMIND" in MAXMIND_LICENSE_KEY:
        print("❌ 错误：请先配置你的MaxMind许可证密钥")
        sys.exit(1)
    
    # 清理并开始
    if os.path.exists(TEMP_DIR):
        shutil.rmtree(TEMP_DIR)
    
    try:
        # 1. 下载
        # type: ignore
        blocks_file, locations_file = download_and_extract()
        
        # 2. 加载国家映射
        print("\n[2] 加载国家映射...")
        country_map = {}
        try:
            with open(locations_file, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    country_map[row['geoname_id']] = row['country_iso_code']
        except:
            eng_file = locations_file.replace('zh-CN', 'en')
            with open(eng_file, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    country_map[row['geoname_id']] = row['country_iso_code']
        
        # 3. 按三级分类收集数据
        print("[3] 分类收集IP段数据...")
        tier1_data = {c: [] for c in TIER1_COUNTRIES}
        tier2_data = {c: [] for c in TIER2_COUNTRIES}
        tier3_data = []  # 其他国家
        
        with open(blocks_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for i, row in enumerate(reader):
                if i % 200000 == 0 and i > 0:
                    print(f"    已处理 {i:,} 行...")
                
                geoname_id = row.get('registered_country_geoname_id') or row.get('geoname_id')
                country = country_map.get(geoname_id, '')  # 如果找不到，默认为空字符串
                if not country:
                    continue
                
                try:
                    net = ip_network(row['network'].strip())
                    start, end = int(net.network_address), int(net.broadcast_address)
                    
                    if country in TIER1_COUNTRIES:
                        tier1_data[country].append((start, end))
                    elif country in TIER2_COUNTRIES:
                        tier2_data[country].append((start, end))
                    else:
                        tier3_data.append((start, end))
                except:
                    continue
        
        # 4. 三级差异化合并
        print("\n[4] 执行三级差异化合并...")
        all_entries = []
        
        # 4.1 第一层级：核心8国 (高精度)
        print("    第一层级 (核心8国 - 高精度):")
        for country in sorted(TIER1_COUNTRIES):
            ranges = tier1_data[country]
            if not ranges:
                continue
            merged = tiered_merge_ranges(ranges, tier_level=1)
            for s, e in merged:
                all_entries.append([s, e, country])
            print(f"        {country}: {len(ranges):,} -> {len(merged):,} 区间")
        
        # 4.2 第二层级：次要10国 (中精度)
        print("    第二层级 (次要10国 - 中精度):")
        for country in sorted(TIER2_COUNTRIES):
            ranges = tier2_data[country]
            if not ranges:
                continue
            merged = tiered_merge_ranges(ranges, tier_level=2)
            for s, e in merged:
                all_entries.append([s, e, country])
            print(f"        {country}: {len(ranges):,} -> {len(merged):,} 区间")
        
        # 4.3 第三层级：其余所有 (低精度)
        print("    第三层级 (其余所有 - 低精度):")
        if tier3_data:
            merged = tiered_merge_ranges(tier3_data, tier_level=3)
            for s, e in merged:
                all_entries.append([s, e, OTHER_COUNTRY_CODE])
            print(f"        其余国家: {len(tier3_data):,} -> {len(merged):,} 区间")
            print(f"        标记为: '{OTHER_COUNTRY_CODE}'")
        
        # 5. 排序并保存
        print("\n[5] 保存为优化JSON...")
        all_entries.sort(key=lambda x: x[0])
        
        result = {
            "meta": {
                "version": "three-tier-v1",
                "tier1": sorted(list(TIER1_COUNTRIES)),
                "tier2": sorted(list(TIER2_COUNTRIES)),
                "other": OTHER_COUNTRY_CODE,
                "generated": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
                "totalRanges": len(all_entries)
            },
            "data": all_entries
        }
        
        with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
            json.dump(result, f, separators=(',', ':'))
        
        size = os.path.getsize(OUTPUT_JSON)
        size_kb = size / 1024
        size_mb = size_kb / 1024
        
        print(f"    最终区间总数: {len(all_entries):,}")
        print(f"    最终文件大小: {size_mb:.2f} MB ({size_kb:.1f} KB)")
        
        # 6. 预期效果分析
        print("\n" + "=" * 60)
        print("✅ 三级精度数据库构建完成！")
        print("=" * 60)
        
        # 基于美国数据大幅减少的预期
        expected_savings = (84000 - len(all_entries)) / 84000 * 100
        print(f"\n📊 优化效果:")
        print(f"    • 对比之前84,300个区间，预计减少 {expected_savings:.1f}%")
        
        if size_mb > 1.2:
            print(f"\n⚠️  文件仍 >1.2MB，可考虑:")
            print(f"   1. 将第二层级国家移入第三层级 (改为'ZZ')")
            print(f"   2. 在 tiered_merge_ranges() 中调整合并阈值")
        elif size_mb > 0.8:
            print(f"\n📈 大小适中 ({size_mb:.2f}MB)，适合异步加载")
        else:
            print(f"\n✨ 优化出色！文件 < 0.8MB")
        
        print(f"\n💡 前端加载提示:")
        print(f"   文件将异步加载，不影响页面初始显示")
        
    except Exception as e:
        print(f"\n❌ 错误: {e}")
        sys.exit(1)
        import traceback
        traceback.print_exc()
    finally:
        if os.path.exists(TEMP_DIR):
            shutil.rmtree(TEMP_DIR)
        print("=" * 60)

if __name__ == "__main__":
    main()