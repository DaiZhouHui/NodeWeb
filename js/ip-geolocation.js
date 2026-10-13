// ip-geolocation.js - 终极兼容版

(function () {
  "use strict";

  // ========== [核心配置] ==========
  // 数据库文件路径
  const DATABASE_PATHS = [
    "./database.json", // 当前目录
    "/database.json", // 根目录
    "../database.json", // 上级目录
    "data/database.json", // data子目录
  ];

  // ========== [关键：这里插入你的自定义方法] ==========
  // 这是主要的回调点，当数据库加载失败或查询结果为ZZ时调用
  async function getIPLocationCustom(ip) {
    // 1. 基础验证
    if (!ip || typeof ip !== "string") return "未知";

    const parts = ip.split(".");
    if (parts.length !== 4) return "未知";

    // 验证每个部分
    for (let i = 0; i < 4; i++) {
      const part = parseInt(parts[i], 10);
      if (isNaN(part) || part < 0 || part > 255) return "未知";
    }

    const p1 = parseInt(parts[0], 10);
    const p2 = parseInt(parts[1], 10);

    // 2. 私有地址判断
    if (p1 === 10) return "内部网络";
    if (p1 === 172 && p2 >= 16 && p2 <= 31) return "内部网络";
    if (p1 === 192 && p2 === 168) return "内部网络";
    if (p1 === 169 && p2 === 254) return "内部网络";

    // 3. 特殊IP处理
    if (ip === "1.1.1.1" || ip === "1.0.0.1") return "美国"; // CloudFlare
    if (ip === "8.8.8.8" || ip === "8.8.4.4") return "美国"; // Google DNS
    if (ip === "9.9.9.9" || ip === "149.112.112.112") return "美国"; // Quad9

    // 4. 特殊网段处理
    if (ip.startsWith("203.119.")) return "越南";
    if (ip.startsWith("202.44.")) return "泰国";
    if (ip.startsWith("202.55.")) return "新加坡";
    if (ip.startsWith("165.246.")) return "韩国";
    if (ip.startsWith("202.12.")) return "日本";

    // Cloudflare托管IP优化映射（您的核心需求）
    if (ip.startsWith("23.227.")) return "加拿大"; // Shopify
    if (ip.startsWith("45.60.")) return "美国"; // Cloudflare合作伙伴
    if (ip.startsWith("76.76.")) return "美国"; // Vercel
    if (ip.startsWith("134.209.")) return "美国"; // DigitalOcean
    if (ip.startsWith("157.230.")) return "德国"; // DigitalOcean德国
    if (ip.startsWith("159.89.")) return "新加坡"; // DigitalOcean新加坡

    // 5. 61.x.x.x系列（亚洲）
    if (p1 === 61) {
      // 日本
      if ((p2 >= 112 && p2 <= 127) || p2 === 231) return "日本";
      // 韩国
      if ((p2 >= 128 && p2 <= 143) || p2 === 233) return "韩国";
      // 香港
      if ((p2 >= 144 && p2 <= 159) || p2 === 235) return "香港";
      // 新加坡
      if (p2 === 234) return "新加坡";
      // 台湾
      if ((p2 >= 32 && p2 <= 63) || p2 === 236) return "台湾";
      // 马来西亚
      if (p2 === 238 || p2 === 239) return "马来西亚";
      // 印度尼西亚
      if (p2 === 240 || p2 === 241) return "印度尼西亚";
      // 泰国
      if (p2 === 242 || p2 === 243) return "泰国";
      // 菲律宾
      if (p2 === 244 || p2 === 245) return "菲律宾";
      // 越南
      if (p2 === 246 || p2 === 247) return "越南";
      // 中国
      return "中国";
    }

    // 6. 核心国家判断
    // 中国
    if (
      (p1 >= 114 && p1 <= 126) ||
      p1 === 180 ||
      p1 === 182 ||
      p1 === 183 ||
      (p1 >= 202 && p1 <= 203) ||
      (p1 >= 210 && p1 <= 223)
    )
      return "中国";

    // 美国
    if (
      p1 === 8 ||
      p1 === 13 ||
      p1 === 23 ||
      p1 === 34 ||
      p1 === 35 ||
      p1 === 40 ||
      p1 === 45 ||
      p1 === 50 ||
      p1 === 52 ||
      p1 === 54 ||
      p1 === 63 ||
      p1 === 64 ||
      p1 === 65 ||
      p1 === 66 ||
      p1 === 67 ||
      p1 === 68 ||
      p1 === 69 ||
      p1 === 70 ||
      p1 === 71 ||
      p1 === 72 ||
      p1 === 73 ||
      p1 === 74 ||
      p1 === 75 ||
      p1 === 76 ||
      p1 === 96 ||
      p1 === 97 ||
      p1 === 98 ||
      p1 === 99 ||
      p1 === 104 ||
      p1 === 107 ||
      p1 === 108 ||
      p1 === 131 ||
      p1 === 132 ||
      p1 === 134 ||
      p1 === 136 ||
      p1 === 140 ||
      p1 === 142 ||
      p1 === 146 ||
      p1 === 147 ||
      p1 === 148 ||
      p1 === 149 ||
      p1 === 150 ||
      p1 === 152 ||
      p1 === 155 ||
      p1 === 156 ||
      p1 === 157 ||
      p1 === 158 ||
      p1 === 159 ||
      p1 === 160 ||
      p1 === 161 ||
      p1 === 162 ||
      p1 === 164 ||
      p1 === 165 ||
      p1 === 166 ||
      p1 === 167 ||
      p1 === 168 ||
      p1 === 169 ||
      p1 === 170 ||
      p1 === 172 ||
      p1 === 173 ||
      p1 === 174 ||
      p1 === 184 ||
      p1 === 192 ||
      p1 === 198 ||
      p1 === 199 ||
      p1 === 204 ||
      p1 === 205 ||
      p1 === 206 ||
      p1 === 207 ||
      p1 === 208 ||
      p1 === 209 ||
      p1 === 216
    )
      return "美国";

    // 日本
    if (p1 === 133 || p1 === 157 || p1 === 202 || p1 === 210) return "日本";

    // 韩国
    if (p1 === 175 || (p1 === 211 && p2 >= 32 && p2 <= 63)) return "韩国";

    // 新加坡
    if (p1 === 128 || p1 === 165 || (p1 === 203 && p2 >= 112 && p2 <= 127))
      return "新加坡";

    // 香港
    if (p1 === 203 || (p1 === 43 && p2 >= 129 && p2 <= 136)) return "香港";

    // 台湾
    if (
      (p1 === 60 && p2 >= 192 && p2 <= 207) ||
      (p1 === 211 && p2 >= 72 && p2 <= 79)
    )
      return "台湾";

    // 澳大利亚
    if (
      (p1 >= 1 && p1 <= 14) ||
      (p1 >= 27 && p1 <= 43) ||
      (p1 >= 49 && p1 <= 60) ||
      (p1 >= 101 && p1 <= 126) ||
      (p1 >= 139 && p1 <= 144) ||
      p1 === 153 ||
      p1 === 171 ||
      p1 === 175 ||
      p1 === 180 ||
      p1 === 182 ||
      p1 === 183 ||
      p1 === 202 ||
      p1 === 203
    )
      return "澳大利亚";

    // 7. 其他主要地区
    // 欧洲
    if (
      (p1 >= 77 && p1 <= 95) ||
      (p1 >= 109 && p1 <= 126) ||
      (p1 >= 176 && p1 <= 191) ||
      (p1 >= 193 && p1 <= 199)
    ) {
      // 进一步细分欧洲国家
      if (p1 === 77 || p1 === 78 || p1 === 79 || p1 === 80) return "德国";
      if (p1 === 81 || p1 === 82 || p1 === 83) return "法国";
      if (p1 === 84 || p1 === 85 || p1 === 86) return "英国";
      if (p1 === 87 || p1 === 88 || p1 === 89) return "荷兰";
      if (p1 === 90 || p1 === 91 || p1 === 92) return "意大利";
      return "欧洲";
    }

    // 8. 基于IP首字节的粗略判断
    if (p1 >= 1 && p1 <= 126) {
      if (p1 === 24 || p1 === 99 || p1 === 142) return "加拿大";
      return "北美";
    }
    if (p1 >= 128 && p1 <= 191) {
      if (p1 === 128 || p1 === 129) return "澳大利亚";
      if (p1 === 150 || p1 === 151) return "新西兰";
      return "欧洲";
    }
    if (p1 >= 192 && p1 <= 223) return "亚洲";

    return "未知";
  }

  // ========== 国家代码映射//如果加不到使用默认配置的几个 ==========
  const COUNTRY_MAP = window.countryNameToChinese || {
    CN: "中国",
    US: "美国",
    JP: "日本",
    KR: "韩国",
    HK: "中国香港",
    TW: "中国台湾",
    MO: "中国澳门",
    SG: "新加坡",
    AU: "澳大利亚",
    NZ: "新西兰",
    GB: "英国",
    FR: "法国",
    DE: "德国",
    IT: "意大利",
    ES: "西班牙",
    NL: "荷兰",
    RU: "俄罗斯",
    CA: "加拿大",
    IN: "印度",
    BR: "巴西",
    ZZ: "其他地区",
  };

  // ========== 状态变量 ==========
  let ipDatabase = null;
  let isDatabaseLoaded = false;
  let databaseUrl = null;
  let useCustomMethod = false; // 标记是否强制使用自定义方法

  // ========== 工具函数 ==========
  function isValidIPv4(ip) {
    const parts = (ip || "").split(".");
    if (parts.length !== 4) return false;
    return parts.every((part) => {
      const num = parseInt(part, 10);
      return !isNaN(num) && num >= 0 && num <= 255 && part === num.toString();
    });
  }

  function ipToInt(ip) {
    return (
      ip
        .split(".")
        .reduce((int, octet) => (int << 8) + parseInt(octet, 10), 0) >>> 0
    );
  }

  function countryCodeToChinese(code) {
    return COUNTRY_MAP[code] || code;
  }

  // ========== [关键：数据库加载] ==========
  async function tryLoadDatabase() {
    console.log("[数据库] 尝试加载...");

    // 如果是本地文件协议，直接跳过数据库加载
    if (window.location.protocol === "file:") {
      console.log(
        "[数据库] 检测到本地文件协议，跳过数据库加载，直接使用自定义方法",
      );
      useCustomMethod = true;
      return false;
    }

    // 否则尝试加载
    for (const path of DATABASE_PATHS) {
      try {
        const response = await fetch(path);
        if (!response.ok) continue;

        const data = await response.json();
        if (!data.data || !Array.isArray(data.data)) continue;

        ipDatabase = data.data;
        databaseUrl = path;
        isDatabaseLoaded = true;

        console.log(
          `✅ [数据库] 加载成功: ${path}, 记录数: ${ipDatabase.length}`,
        );
        return true;
      } catch (error) {
        console.log(`[数据库] 路径 ${path} 失败: ${error.message}`);
      }
    }

    console.log("❌ [数据库] 所有路径尝试失败，将使用自定义方法");
    useCustomMethod = true;
    return false;
  }

  // ========== [关键：本地数据库查询] ==========
  async function queryLocalDatabase(ip) {
    // 【回退点1】如果标记为使用自定义方法，直接跳过
    if (useCustomMethod) {
      console.log(`[查询] 使用自定义方法模式，跳过本地数据库`);
      return null;
    }

    // 【回退点2】如果数据库未加载
    if (!isDatabaseLoaded || !ipDatabase || ipDatabase.length === 0) {
      console.log(`[查询] 数据库未加载，跳过本地查询`);
      return null;
    }

    try {
      const ipInt = ipToInt(ip);

      // 二分查找
      let low = 0,
        high = ipDatabase.length - 1;
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const [start, end, code] = ipDatabase[mid];

        if (ipInt >= start && ipInt <= end) {
          console.log(`[查询] 本地数据库命中: ${ip} -> ${code}`);
          return code;
        }
        if (ipInt < start) high = mid - 1;
        else low = mid + 1;
      }

      console.log(`[查询] 本地数据库未找到: ${ip}`);
      return null;
    } catch (error) {
      console.error(`[查询] 本地查询出错:`, error);
      return null;
    }
  }

  // ========== [核心：主查询函数] ==========
  async function getIPLocation(ip) {
    console.log(`\n[查询开始] IP: ${ip}`);

    // 验证输入
    if (!ip || typeof ip !== "string") return "无效IP地址";
    ip = ip.trim();
    if (!isValidIPv4(ip)) return "无效IP地址";

    try {
      // 【第1步】尝试本地数据库
      const localCode = await queryLocalDatabase(ip);

      // 【第2步】如果本地数据库有结果且不是ZZ
      if (localCode && localCode !== "ZZ") {
        const chineseName = countryCodeToChinese(localCode);
        console.log(`✅ [查询完成] 使用本地数据库: ${ip} -> ${chineseName}`);
        return chineseName;
      }

      // 【第3步：关键调用点】调用你的自定义方法
      // 当本地数据库未加载、未找到、或结果是ZZ时执行
      console.log(`[查询] 调用自定义方法: ${ip}`);
      const customResult = await getIPLocationCustom(ip);

      if (customResult && customResult !== "ZZ" && customResult !== "未知") {
        console.log(`✅ [查询完成] 使用自定义方法: ${ip} -> ${customResult}`);
        return customResult;
      }

      // 【第4步】所有方法都失败
      console.log(`[查询] 所有方法均未返回有效结果`);
      if (localCode === "ZZ") return "其他地区";
      return "未知";
    } catch (error) {
      console.error(`[查询] 查询过程出错:`, error);
      return "未知";
    }
  }

  // ========== 批量查询 ==========
  async function batchGetIPLocation(ipList) {
    const results = [];
    for (const ip of ipList) {
      results.push({
        ip: ip,
        location: await getIPLocation(ip),
        source: useCustomMethod ? "自定义方法" : "混合查询",
      });
    }
    return results;
  }

  // ========== 状态查询 ==========
  function getServiceStatus() {
    return {
      databaseLoaded: isDatabaseLoaded,
      databaseUrl: databaseUrl,
      databaseSize: ipDatabase ? ipDatabase.length : 0,
      useCustomMethod: useCustomMethod,
      environment:
        window.location.protocol === "file:" ? "本地文件" : "HTTP服务器",
    };
  }

  // ========== [关键：初始化] ==========
  async function initialize() {
    console.log("🔄 初始化IP地理位置服务...");

    // 尝试加载数据库，但不强制要求成功
    await tryLoadDatabase();

    const status = getServiceStatus();
    console.log("服务状态:", status);

    return status;
  }

  // ========== 导出到全局 ==========
  window.IPGeolocationService = {
    // 核心查询方法
    getIPLocation,

    // 批量查询
    batchGetIPLocation,

    // 工具
    isValidIPv4,
    getCountryName: countryCodeToChinese,

    // 状态
    getStatus: getServiceStatus,
    initialize,

    // 【关键：设置自定义方法接口】
    setCustomMethod: function (customMethod) {
      if (typeof customMethod === "function") {
        getIPLocationCustom = customMethod;
        useCustomMethod = true; // 设置为自定义方法优先
        console.log("[配置] 自定义查询方法已设置并启用");
      }
    },

    // 调试
    debug: {
      forceCustomMethod: function () {
        useCustomMethod = true;
        console.log("[调试] 强制使用自定义方法模式");
      },

      forceDatabaseMethod: function () {
        useCustomMethod = false;
        console.log("[调试] 强制使用数据库模式");
      },
    },
  };

  // 自动初始化
  document.addEventListener("DOMContentLoaded", function () {
    console.log("📄 页面加载完成，正在初始化...");
    initialize().then((status) => {
      console.log("✅ 初始化完成", status);
    });
  });
})();
