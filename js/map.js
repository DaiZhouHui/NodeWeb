// 新增：英文国家名到中文的映射
const countryNameToChinese = {
    // 亚洲
    'China': '中国', 'CN': '中国', 'Japan': '日本', 'JP': '日本', 'South Korea': '韩国',
    'Korea, Republic of': '韩国', 'Korea': '韩国', 'KR': '韩国', 'North Korea': '朝鲜',
    'Korea, Democratic People\'s Republic of': '朝鲜', 'KP': '朝鲜', 'Singapore': '新加坡',
    'SG': '新加坡', 'Hong Kong': '香港', 'Hong Kong SAR': '香港', 'HK': '香港',
    'Macau': '澳门', 'Macao SAR': '澳门', 'MO': '澳门', 'Taiwan': '台湾',
    'Taiwan, Province of China': '台湾', 'TW': '台湾', 'Thailand': '泰国', 'TH': '泰国',
    'Vietnam': '越南', 'VN': '越南', 'Malaysia': '马来西亚', 'MY': '马来西亚',
    'Indonesia': '印度尼西亚', 'ID': '印度尼西亚', 'Philippines': '菲律宾', 'PH': '菲律宾',
    'India': '印度', 'IN': '印度', 'Pakistan': '巴基斯坦', 'PK': '巴基斯坦',
    'Bangladesh': '孟加拉国', 'BD': '孟加拉国', 'Sri Lanka': '斯里兰卡', 'LK': '斯里兰卡',
    'Myanmar': '缅甸', 'MM': '缅甸', 'Cambodia': '柬埔寨', 'KH': '柬埔寨', 'Laos': '老挝',
    'LA': '老挝', 'Mongolia': '蒙古', 'MN': '蒙古', 'Nepal': '尼泊尔', 'NP': '尼泊尔',
    'Bhutan': '不丹', 'BT': '不丹', 'Maldives': '马尔代夫', 'MV': '马尔代夫',
    'Brunei': '文莱', 'BN': '文莱', 'East Timor': '东帝汶', 'TL': '东帝汶',
    'Kazakhstan': '哈萨克斯坦', 'KZ': '哈萨克斯坦', 'Kyrgyzstan': '吉尔吉斯斯坦', 'KG': '吉尔吉斯斯坦',
    'Uzbekistan': '乌兹别克斯坦', 'UZ': '乌兹别克斯坦', 'Tajikistan': '塔吉克斯坦', 'TJ': '塔吉克斯坦',
    'Turkmenistan': '土库曼斯坦', 'TM': '土库曼斯坦', 'Afghanistan': '阿富汗', 'AF': '阿富汗',

    // 中东
    'Iran': '伊朗', 'IR': '伊朗', 'Iraq': '伊拉克', 'IQ': '伊拉克', 'Saudi Arabia': '沙特阿拉伯',
    'SA': '沙特阿拉伯', 'United Arab Emirates': '阿联酋', 'AE': '阿联酋', 'Qatar': '卡塔尔',
    'QA': '卡塔尔', 'Oman': '阿曼', 'OM': '阿曼', 'Kuwait': '科威特', 'KW': '科威特',
    'Bahrain': '巴林', 'BH': '巴林', 'Jordan': '约旦', 'JO': '约旦', 'Lebanon': '黎巴嫩',
    'LB': '黎巴嫩', 'Syria': '叙利亚', 'SY': '叙利亚', 'Yemen': '也门', 'YE': '也门',
    'Israel': '以色列', 'IL': '以色列', 'Palestine': '巴勒斯坦', 'PS': '巴勒斯坦',
    'Turkey': '土耳其', 'TR': '土耳其',

    // 欧洲
    'Russia': '俄罗斯', 'RU': '俄罗斯', 'United Kingdom': '英国', 'UK': '英国', 'GB': '英国',
    'Germany': '德国', 'DE': '德国', 'France': '法国', 'FR': '法国', 'Italy': '意大利',
    'IT': '意大利', 'Spain': '西班牙', 'ES': '西班牙', 'Netherlands': '荷兰', 'NL': '荷兰',
    'Belgium': '比利时', 'BE': '比利时', 'Switzerland': '瑞士', 'CH': '瑞士', 'Sweden': '瑞典',
    'SE': '瑞典', 'Norway': '挪威', 'NO': '挪威', 'Finland': '芬兰', 'FI': '芬兰',
    'Denmark': '丹麦', 'DK': '丹麦', 'Poland': '波兰', 'PL': '波兰', 'Austria': '奥地利',
    'AT': '奥地利', 'Portugal': '葡萄牙', 'PT': '葡萄牙', 'Ireland': '爱尔兰', 'IE': '爱尔兰',
    'Greece': '希腊', 'GR': '希腊', 'Czech Republic': '捷克', 'CZ': '捷克', 'Czechia': '捷克',
    'Hungary': '匈牙利', 'HU': '匈牙利', 'Romania': '罗马尼亚', 'RO': '罗马尼亚', 'Bulgaria': '保加利亚',
    'BG': '保加利亚', 'Serbia': '塞尔维亚', 'RS': '塞尔维亚', 'Croatia': '克罗地亚',
    'HR': '克罗地亚', 'Slovakia': '斯洛伐克', 'SK': '斯洛伐克', 'Slovenia': '斯洛文尼亚',
    'SI': '斯洛文尼亚', 'Estonia': '爱沙尼亚', 'EE': '爱沙尼亚', 'Latvia': '拉脱维亚',
    'LV': '拉脱维亚', 'Lithuania': '立陶宛', 'LT': '立陶宛', 'Ukraine': '乌克兰',
    'UA': '乌克兰', 'Belarus': '白俄罗斯', 'BY': '白俄罗斯', 'Moldova': '摩尔多瓦',
    'MD': '摩尔多瓦', 'Albania': '阿尔巴尼亚', 'AL': '阿尔巴尼亚', 'Macedonia': '北马其顿',
    'MK': '北马其顿', 'Montenegro': '黑山', 'ME': '黑山', 'Bosnia and Herzegovina': '波黑',
    'BA': '波黑', 'Cyprus': '塞浦路斯', 'CY': '塞浦路斯', 'Luxembourg': '卢森堡', 'LU': '卢森堡',
    'Iceland': '冰岛', 'IS': '冰岛', 'Malta': '马耳他', 'MT': '马耳他',

    // 北美
    'United States': '美国', 'United States of America': '美国', 'USA': '美国', 'US': '美国',
    'Canada': '加拿大', 'CA': '加拿大', 'Mexico': '墨西哥', 'MX': '墨西哥', 'Cuba': '古巴',
    'CU': '古巴', 'Jamaica': '牙买加', 'JM': '牙买加', 'Dominican Republic': '多米尼加',
    'DO': '多米尼加', 'Haiti': '海地', 'HT': '海地', 'Bahamas': '巴哈马', 'BS': '巴哈马',
    'Belize': '伯利兹', 'BZ': '伯利兹', 'Costa Rica': '哥斯达黎加', 'CR': '哥斯达黎加',
    'Honduras': '洪都拉斯', 'HN': '洪都拉斯', 'Guatemala': '危地马拉', 'GT': '危地马拉',
    'Nicaragua': '尼加拉瓜', 'NI': '尼加拉瓜', 'Panama': '巴拿马', 'PA': '巴拿马',
    'El Salvador': '萨尔瓦多', 'SV': '萨尔瓦多',

    // 南美
    'Brazil': '巴西', 'BR': '巴西', 'Argentina': '阿根廷', 'AR': '阿根廷', 'Chile': '智利',
    'CL': '智利', 'Colombia': '哥伦比亚', 'CO': '哥伦比亚', 'Peru': '秘鲁', 'PE': '秘鲁',
    'Venezuela': '委内瑞拉', 'VE': '委内瑞拉', 'Ecuador': '厄瓜多尔', 'EC': '厄瓜多尔',
    'Bolivia': '玻利维亚', 'BO': '玻利维亚', 'Paraguay': '巴拉圭', 'PY': '巴拉圭',
    'Uruguay': '乌拉圭', 'UY': '乌拉圭', 'Guyana': '圭亚那', 'GY': '圭亚那',
    'Suriname': '苏里南', 'SR': '苏里南', 'French Guiana': '法属圭亚那', 'GF': '法属圭亚那',

    // 大洋洲
    'Australia': '澳大利亚', 'AU': '澳大利亚', 'New Zealand': '新西兰', 'NZ': '新西兰',
    'Fiji': '斐济', 'FJ': '斐济', 'Papua New Guinea': '巴布亚新几内亚', 'PG': '巴布亚新几内亚',
    'Solomon Islands': '所罗门群岛', 'SB': '所罗门群岛', 'Vanuatu': '瓦努阿图', 'VU': '瓦努阿图',
    'Samoa': '萨摩亚', 'WS': '萨摩亚', 'Tonga': '汤加', 'TO': '汤加',

    // 非洲地区
    'JNB': '约翰内斯堡', 'CPT': '开普敦', 'CAI': '开罗', 'NBO': '内罗毕', 'ADD': '亚的斯亚贝巴',
    'CIR': '开罗', 'ALY': '亚历山大', 'DAR': '达累斯萨拉姆', 'LOS': '拉各斯',
    'ACC': '阿克拉', 'CCS': '卡萨布兰卡', 'TUN': '突尼斯', 'SFJ': '圣但尼',
};

// 新增：地区码(城市英文名,地区名,地区码,机场码等)到中文名称的映射 - 大幅扩展Cloudflare覆盖地点
const regionCodeToChinese = {
    // 北美 - 美国主要城市（城市全名映射 + IATA码）
    'Los Angeles': '洛杉矶', 'LAX': '洛杉矶', 'San Jose': '圣何塞', 'SJC': '圣何塞',
    'San Francisco': '旧金山', 'SFO': '旧金山', 'New York': '纽约', 'NYC': '纽约', 'Miami': '迈阿密', 'MIA': '迈阿密',
    'Dallas': '达拉斯', 'DFW': '达拉斯', 'Chicago': '芝加哥', 'ORD': '芝加哥', 'Atlanta': '亚特兰大', 'ATL': '亚特兰大',
    'Seattle': '西雅图', 'SEA': '西雅图', 'Washington DC': '华盛顿', 'IAD': '华盛顿',
    'Denver': '丹佛', 'DEN': '丹佛', 'Phoenix': '菲尼克斯', 'PHX': '菲尼克斯', 'Las Vegas': '拉斯维加斯', 'LAS': '拉斯维加斯',
    'Boston': '波士顿', 'BOS': '波士顿', 'Portland': '波特兰', 'PDX': '波特兰',
    'Austin': '奥斯汀', 'AUS': '奥斯汀', 'Minneapolis': '明尼阿波利斯', 'MSP': '明尼阿波利斯', 'Detroit': '底特律', 'DTW': '底特律',
    'Cleveland': '克利夫兰', 'CLE': '克利夫兰', 'Philadelphia': '费城', 'PHL': '费城',
    'Houston': '休斯顿', 'HOU': '休斯顿', 'IAH': '休斯顿', 'Salt Lake City': '盐湖城', 'SLC': '盐湖城',
    'Orlando': '奥兰多', 'MCO': '奥兰多', 'Tampa': '坦帕', 'TPA': '坦帕', 'Nashville': '纳什维尔', 'BNA': '纳什维尔',
    'JFK': '纽约肯尼迪', 'LaGuardia': '纽约拉瓜迪亚', 'LGA': '纽约拉瓜迪亚', 'Newark': '纽瓦克', 'EWR': '纽瓦克',
    'San Diego': '圣地亚哥', 'SAN': '圣地亚哥', 'Sacramento': '萨克拉门托', 'SAC': '萨克拉门托', 'SMF': '萨克拉门托',
    'Ontario': '安大略', 'ONT': '安大略', 'Burbank': '伯班克', 'BUR': '伯班克', 'Long Beach': '长滩', 'LGB': '长滩',
    'Reno': '雷诺', 'REN': '雷诺', 'Fresno': '法国托', 'FAT': '法国托', 'Fort Lauderdale': '劳德代尔堡', 'FLL': '劳德代尔堡',
    'New Orleans': '新奥尔良', 'MSY': '新奥尔良', 'Kansas City': '堪萨斯城', 'MCI': '堪萨斯城',
    'Saint Louis': '圣路易斯', 'STL': '圣路易斯', 'Memphis': '孟菲斯', 'MEM': '孟菲斯',
    'Baltimore': '巴尔的摩', 'BWI': '巴尔的摩', 'Washington Dulles': '华盛顿里根', 'DCA': '华盛顿里根',
    'Greensboro': '格林斯博罗', 'GSO': '格林斯博罗', 'Raleigh': '罗利', 'RDU': '罗利',
    'Cincinnati': '辛辛那提', 'CVG': '辛辛那提', 'Columbus': '哥伦布', 'CMH': '哥伦布',
    'Indianapolis': '印第安纳波利斯', 'IND': '印第安纳波利斯', 'Milwaukee': '密尔沃基', 'MKE': '密尔沃基',

    // 美国州代码
    'CA': '加利福尼亚', 'NY': '纽约', 'TX': '得克萨斯', 'FL': '佛罗里达', 'IL': '伊利诺伊',
    'PA': '宾夕法尼亚', 'OH': '俄亥俄', 'GA': '佐治亚', 'NC': '北卡罗来纳', 'MI': '密歇根',
    'NJ': '新泽西', 'VA': '弗吉尼亚', 'WA': '华盛顿', 'MA': '马萨诸塞', 'IN': '印第安纳',
    'AZ': '亚利桑那', 'TN': '田纳西', 'MO': '密苏里', 'MD': '马里兰', 'WI': '威斯康星',
    'MN': '明尼苏达', 'CO': '科罗拉多', 'AL': '阿拉巴马', 'SC': '南卡罗来纳', 'LA': '路易斯安那',
    'KY': '肯塔基', 'OR': '俄勒冈', 'OK': '俄克拉荷马', 'CT': '康涅狄格', 'IA': '爱荷华',
    'MS': '密西西比', 'AR': '阿肯色', 'KS': '堪萨斯', 'UT': '犹他', 'NV': '内华达',
    'NM': '新墨西哥', 'NE': '内布拉斯加', 'WV': '西弗吉尼亚', 'ID': '爱达荷', 'HI': '夏威夷',
    'ME': '缅因', 'NH': '新罕布什尔', 'RI': '罗德岛', 'MT': '蒙大拿', 'DE': '特拉华',
    'SD': '南达科他', 'ND': '北达科他', 'AK': '阿拉斯加', 'VT': '佛蒙特', 'WY': '怀俄明',

    // 加拿大 - 城市（全名映射）
    'Toronto': '多伦多', 'YYZ': '多伦多', 'Vancouver': '温哥华', 'YVR': '温哥华',
    'Montreal': '蒙特利尔', 'YUL': '蒙特利尔', 'Calgary': '卡尔加里', 'YYC': '卡尔加里',
    'Edmonton': '埃德蒙顿', 'YEG': '埃德蒙顿',
    'Ottawa': '渥太华', 'YOW': '渥太华', 'Halifax': '哈利法克斯', 'YHZ': '哈利法克斯',
    'Winnipeg': '温尼伯', 'YWG': '温尼伯', 'Victoria': '维多利亚', 'YYJ': '维多利亚',
    'Kelowna': '开鲁纳', 'YLW': '开鲁纳',
    'Quebec City': '魁北克城', 'YQB': '魁北克城', 'London': '伦敦', 'YIZ': '伦敦',
    'Abbotsford': '阿博茨福德', 'YXX': '阿博茨福德',

    // 加拿大 - 省份代码
    'ON': '安大略', 'QC': '魁北克', 'BC': '不列颠哥伦比亚', 'AB': '艾伯塔', 'MB': '马尼托巴',
    'SK': '萨斯喀彻温', 'NS': '新斯科舍', 'NB': '新不伦瑞克', 'NL': '纽芬兰与拉布拉多',
    'PE': '爱德华王子岛', 'NT': '西北地区', 'YT': '育空', 'NU': '努纳武特',

    // 墨西哥
    'Mexico City': '墨西哥城', 'MEX': '墨西哥城', 'Guadalajara': '瓜达拉哈拉', 'GDL': '瓜达拉哈拉',
    'Tijuana': '蒂华纳', 'TIJ': '蒂华纳', 'Cancun': '坎昆', 'CUN': '坎昆',
    'Puerto Vallarta': '波多黎各瓦尔塔', 'PVR': '波多黎各瓦尔塔',
    'Monterrey': '蒙特雷', 'MTY': '蒙特雷', 'Queretaro': '克雷塔罗', 'QRO': '克雷塔罗',

    // 日本 - 城市（城市全名映射 + IATA码）
    'Tokyo': '东京', 'TYO': '东京', 'Osaka': '大阪', 'OSA': '大阪',
    'Narita': '成田', 'NRT': '成田', 'Haneda': '羽田', 'HND': '羽田', 'Kansai': '关西', 'KIX': '关西',
    'Itami': '伊丹', 'ITM': '伊丹', 'Fukuoka': '福冈', 'FUK': '福冈',
    'Sapporo': '札幌', 'CTS': '札幌', 'Nagoya': '名古屋', 'NGO': '名古屋',
    'Okinawa': '冲绳', 'OKA': '冲绳', 'Kyoto': '京都', 'KYD': '京都',
    'Hiroshima': '广岛', 'HIS': '广岛', 'Niigata': '新潟', 'NKM': '新潟',
    'Izu': '伊豆', 'IZO': '伊豆',

    // 日本 - 地区代码
    'TK': '东京都', 'OS': '大阪府', 'KY': '京都府', 'FK': '福冈县',
    'NG': '爱知县', 'OK': '冲绳县', 'HI': '广岛县', 'SG': '神奈川县', 'CH': '千叶县',
    'ST': '埼玉县', 'NY': '长野县', 'GM': '群马县', 'IB': '茨城县',

    // 韩国 - 城市（城市全名映射）
    'Seoul Incheon': '首尔仁川', 'ICN': '首尔仁川', 'Seoul Gimpo': '首尔金浦', 'GMP': '首尔金浦',
    'Busan': '釜山', 'PUS': '釜山', 'Jeju': '济州', 'CJU': '济州',
    'Daegu': '大邱', 'TAE': '大邱', 'Cheongju': '清州', 'CJJ': '清州',
    'Gwangju': '光州', 'KWJ': '光州', 'Ulsan': '蔚山', 'USN': '蔚山',

    // 韩国 - 地区代码
    'SE': '首尔', 'BS': '釜山', 'DG': '大邱', 'IC': '仁川', 'GJ': '光州',
    'DJ': '大田', 'US': '蔚山', 'SJ': '世宗', 'JJ': '济州', 'GW': '京畿',
    'CB': '忠清北道', 'CN': '忠清南道', 'JB': '全州', 'JN': '全南',

    // 香港
    'Hong Kong': '香港', 'HKG': '香港', 'HK': '香港', 'HongKong': '香港',

    // 澳门
    'Macau': '澳门', 'MFM': '澳门', 'MO': '澳门', 'Macao': '澳门',

    // 台湾 - 城市（城市全名映射）
    'Taipei': '台北', 'TPE': '台北桃园', 'Taipei Taoyuan': '台北桃园',
    'Taipei Songshan': '台北松山', 'TSA': '台北松山',
    'Kaohsiung': '高雄', 'KHH': '高雄', 'Taichung': '台中', 'RMQ': '台中',
    'Tainan': '台南', 'TNN': '台南', 'Taitung': '台东', 'TXG': '台东',
    'Matsu': '马祖', 'MZG': '马祖',

    // 台湾 - 地区代码
    'TP': '台北', 'KH': '高雄', 'TC': '台中', 'TN': '台南', 'TY': '桃园', 'Tai Wang': '台湾',
    'KS': '基隆', 'HC': '新竹', 'CH': '彰化', 'YL': '云林', 'CS': '嘉义', 'PH': '屏东',
    'TT': '台东', 'HL': '花莲',

    // 新加坡
    'Singapore': '新加坡', 'SIN': '新加坡', 'SG': '新加坡',

    // 泰国 - 城市（城市全名映射）
    'Bangkok Suvarnabhumi': '曼谷素万那普', 'BKK': '曼谷素万那普',
    'Bangkok Don Mueang': '曼谷廊曼', 'DMK': '曼谷廊曼',
    'Phuket': '普吉岛', 'HKT': '普吉岛', 'Chiang Mai': '清迈', 'CNX': '清迈',
    'Lopburi': '洛普里', 'USM': '洛普里', 'Hua Hin': '华欣', 'HUA': '华欣',

    // 泰国 - 地区代码
    'BK': '曼谷', 'CM': '清迈', 'PH': '普吉', 'PT': '芭堤雅', 'CR': '清莱',
    'RY': '春武里', 'CT': '中泰', 'UP': '乌隆他尼',

    // 越南 - 城市（城市全名映射）
    'Ho Chi Minh': '胡志明市', 'SGN': '胡志明市', 'Hanoi': '河内', 'HAN': '河内',
    'Da Nang': '岘港', 'DAD': '岘港', 'Can Tho': '坚江', 'CXJ': '坚江',
    'Hoi An': '会安', 'HUI': '会安',

    // 马来西亚 - 城市（城市全名映射）
    'Kuala Lumpur': '吉隆坡', 'KUL': '吉隆坡', 'Penang': '槟城', 'PEN': '槟城',
    'Kota Kinabalu': '亚庇', 'BKI': '亚庇', 'Kota Kinabalu International': '哥打基纳巴鲁', 'SZB': '哥打基纳巴鲁',
    'Johor Bahru': '新山', 'JHB': '新山', 'Kuching': '古晋', 'KCH': '古晋',

    // 印度尼西亚 - 城市（城市全名映射）
    'Jakarta': '雅加达', 'CGK': '雅加达', 'Bali': '巴厘岛', 'DPS': '巴厘岛',
    'Surabaya': '泗水', 'SUB': '泗水', 'Medan': '梅丹', 'MED': '梅丹',
    'Bandung': '万隆', 'BDJ': '万隆',

    // 菲律宾 - 城市（城市全名映射）
    'Manila': '马尼拉', 'MNL': '马尼拉', 'Cebu': '宿务', 'CEB': '宿务',
    'Davao': '达沃', 'DVO': '达沃', 'Iloilo': '伊洛伊洛', 'ILO': '伊洛伊洛',

    // 印度 - 城市（城市全名映射）
    'Delhi': '德里', 'DEL': '德里', 'Mumbai': '孟买', 'BOM': '孟买',
    'Chennai': '金奈', 'MAA': '金奈', 'Kolkata': '加尔各答', 'CCU': '加尔各答',
    'Bangalore': '班加罗尔', 'BLR': '班加罗尔', 'Hyderabad': '海得拉巴', 'HYD': '海得拉巴',
    'Kochi': '科钦', 'COK': '科钦', 'Pune': '浦那', 'PNQ': '浦那',

    // 孟加拉
    'Dhaka': '达卡', 'DAC': '达卡', 'Dacca': '达卡',

    // 欧洲 - 英国城市（城市全名映射 + IATA码）
    'London': '伦敦', 'LHR': '伦敦', 'London Gatwick': '伦敦盖特威克', 'LGW': '伦敦盖特威克',
    'Manchester': '曼彻斯特', 'MAN': '曼彻斯特', 'Birmingham': '伯明翰', 'BHX': '伯明翰',
    'Glasgow': '格拉斯哥', 'GLA': '格拉斯哥', 'Edinburgh': '爱丁堡', 'EDI': '爱丁堡',
    'Bristol': '布里斯托尔', 'BRS': '布里斯托尔', 'Luton': '卢顿', 'LTN': '卢顿',
    'Stansted': '斯坦斯特德', 'STN': '斯坦斯特德', 'London City': '伦敦城', 'LCY': '伦敦城',
    'Belfast': '贝尔法斯特', 'BFS': '贝尔法斯特',

    // 英国 - 地区代码
    'LN': '伦敦', 'MN': '曼彻斯特', 'BH': '伯明翰', 'GL': '格拉斯哥', 'ED': '爱丁堡',
    'LV': '利物浦', 'LF': '利兹', 'CM': '卡迪夫', 'BD': '布拉德福德', 'SH': '谢菲尔德',
    'NC': '纽卡斯尔', 'BR': '布里斯托尔', 'NU': '诺丁汉', 'SF': '南安普敦',

    // 法国 - 城市（城市全名映射 + IATA码）
    'Paris': '巴黎', 'CDG': '巴黎', 'Paris Orly': '巴黎奥利', 'ORY': '巴黎奥利',
    'Marseille': '马赛', 'MRS': '马赛', 'Lyon': '里昂', 'LYS': '里昂', 'Nice': '尼斯', 'NCE': '尼斯',
    'Toulouse': '图卢兹', 'TLS': '图卢兹', 'Bordeaux': '波尔多', 'BOD': '波尔多',
    'Montpellier': '蒙彼利埃', 'MPL': '蒙彼利埃', 'Nantes': '南特', 'NTE': '南特',
    'Biarritz': '比亚里茨', 'BIQ': '比亚里茨', 'Lille': '里尔', 'LIL': '里尔',
    'Aix': '艾克斯', 'AJA': '艾克斯',

    // 德国 - 城市（城市全名映射 + IATA码）
    'Frankfurt': '法兰克福', 'FRA': '法兰克福', 'Munich': '慕尼黑', 'MUC': '慕尼黑',
    'Dusseldorf': '杜塞尔多夫', 'DUS': '杜塞尔多夫', 'Hamburg': '汉堡', 'HAM': '汉堡',
    'Berlin': '柏林', 'BER': '柏林', 'Stuttgart': '斯图加特', 'STR': '斯图加特',
    'Hannover': '汉诺威', 'HAJ': '汉诺威', 'Cologne': '科隆', 'CGN': '科隆',
    'Duisburg': '杜伊斯堡', 'DBU': '杜伊斯堡', 'Bremen': '不来梅', 'BRE': '不来梅',
    'Dortmund': '多特蒙德', 'DTM': '多特蒙德', 'Leipzig': '莱比锡', 'LEJ': '莱比锡',
    'Dresden': '德累斯顿', 'DRS': '德累斯顿',

    // 意大利 - 城市（城市全名映射 + IATA码）
    'Rome': '罗马', 'FCO': '罗马', 'Milan': '米兰', 'MXP': '米兰', 'Milan Linate': '米兰利纳特', 'LIN': '米兰利纳特',
    'Venice': '威尼斯', 'VCE': '威尼斯', 'Florence': '佛罗伦萨', 'FLR': '佛罗伦萨',
    'Naples': '那不勒斯', 'NAP': '那不勒斯', 'Bologna': '博洛尼亚', 'BLQ': '博洛尼亚',
    'Genoa': '热那亚', 'GVA': '热那亚', 'Verona': '维罗纳', 'VRN': '维罗纳',
    'Parma': '帕尔玛', 'PMF': '帕尔玛', 'Turin': '都灵', 'TRN': '都灵',

    // 西班牙 - 城市（城市全名映射 + IATA码）
    'Madrid': '马德里', 'MAD': '马德里', 'Barcelona': '巴塞罗那', 'BCN': '巴塞罗那',
    'Malaga': '马拉加', 'AGP': '马拉加', 'Valencia': '瓦伦西亚', 'VLC': '瓦伦西亚',
    'Seville': '塞维利亚', 'SVQ': '塞维利亚', 'Ibiza': '伊维萨', 'IBZ': '伊维萨',
    'Palma': '帕尔玛', 'PMI': '帕尔玛', 'Bilbao': '毕尔巴鄂', 'BIO': '毕尔巴鄂',
    'Vitoria': '维多利亚', 'VIT': '维多利亚',

    // 荷兰 - 城市（城市全名映射 + IATA码）
    'Amsterdam': '阿姆斯特丹', 'AMS': '阿姆斯特丹', 'Rotterdam': '鹿特丹', 'RTM': '鹿特丹',
    'Eindhoven': '埃因霍温', 'EIN': '埃因霍温', 'Maastricht': '马斯特里赫特', 'MAA': '马斯特里赫特',

    // 瑞士 - 城市（城市全名映射 + IATA码）
    'Zurich': '苏黎世', 'ZRH': '苏黎世', 'Geneva': '日内瓦', 'GVA': '日内瓦',
    'Bern': '伯尔尼', 'BRN': '伯尔尼', 'Basel': '巴塞尔', 'BSL': '巴塞尔',
    'Zug': '祖格', 'ZWZ': '祖格', 'Lugano': '卢加诺', 'LUG': '卢加诺',

    // 其他欧洲 - 城市（城市全名映射 + IATA码）
    'Brussels': '布鲁塞尔', 'BRU': '布鲁塞尔', 'Vienna': '维也纳', 'VIE': '维也纳',
    'Copenhagen': '哥本哈根', 'CPH': '哥本哈根', 'Stockholm': '斯德哥尔摩', 'ARN': '斯德哥尔摩',
    'Oslo': '奥斯陆', 'OSL': '奥斯陆', 'Helsinki': '赫尔辛基', 'HEL': '赫尔辛基',
    'Warsaw': '华沙', 'WAW': '华沙', 'Prague': '布拉格', 'PRG': '布拉格',
    'Budapest': '布达佩斯', 'BUD': '布达佩斯', 'Dublin': '都柏林', 'DUB': '都柏林',
    'Lisbon': '里斯本', 'LIS': '里斯本', 'Athens': '雅典', 'ATH': '雅典',
    'Istanbul': '伊斯坦布尔', 'IST': '伊斯坦布尔', 'Belgrade': '贝尔格莱德', 'BJS': '贝尔格莱德',
    'Sofia': '索菲亚', 'SOF': '索菲亚', 'Riga': '里加', 'RIX': '里加',
    'Vilnius': '维尔纽斯', 'VNO': '维尔纽斯', 'Tallinn': '塔林', 'TLL': '塔林',
    'Bratislava': '布拉迪斯拉发', 'BTS': '布拉迪斯拉发', 'Ljubljana': '卢布尔雅那', 'LJU': '卢布尔雅那',
    'Bucharest': '布加勒斯特', 'BUH': '布加勒斯特',

    // 俄罗斯 - 主要城市（城市全名映射 + IATA码）
    'Moscow Sheremetyevo': '莫斯科谢列梅捷沃', 'SVO': '莫斯科谢列梅捷沃',
    'Moscow Domodedovo': '莫斯科多莫杰多沃', 'DME': '莫斯科多莫杰多沃',
    'Moscow Vnukovo': '莫斯科瓦努科沃', 'VKO': '莫斯科瓦努科沃',
    'Saint Petersburg': '圣彼得堡', 'LED': '圣彼得堡', 'Yekaterinburg': '叶卡捷琳堡', 'SVX': '叶卡捷琳堡',
    'Novosibirsk': '新西伯利亚', 'NOV': '新西伯利亚', 'Vladivostok': '符拉迪沃斯托克', 'VVO': '符拉迪沃斯托克',

    // 大洋洲 - 澳大利亚城市（城市全名映射 + IATA码）
    'Sydney': '悉尼', 'SYD': '悉尼', 'Melbourne': '墨尔本', 'MEL': '墨尔本',
    'Brisbane': '布里斯班', 'BNE': '布里斯班', 'Perth': '珀斯', 'PER': '珀斯',
    'Adelaide': '阿德莱德', 'ADL': '阿德莱德', 'Canberra': '堪培拉', 'CBR': '堪培拉',
    'Hobart': '霍巴特', 'HBA': '霍巴特', 'Avalon': '阿瓦隆', 'AVV': '阿瓦隆',

    // 澳大利亚 - 州代码
    'NSW': '新南威尔士', 'VIC': '维多利亚', 'QLD': '昆士兰', 'WA': '西澳大利亚',
    'SA': '南澳大利亚', 'TAS': '塔斯马尼亚', 'ACT': '首都领地', 'NT': '北领地',

    // 新西兰 - 城市（城市全名映射 + IATA码）
    'Auckland': '奥克兰', 'AKL': '奥克兰', 'Wellington': '惠灵顿', 'WLG': '惠灵顿',
    'Christchurch': '基督城', 'CHC': '基督城', 'Queenstown': '皇后镇', 'ZQN': '皇后镇',

    // 中东地区 - 城市（城市全名映射 + IATA码）
    'Dubai': '迪拜', 'DXB': '迪拜', 'Abu Dhabi': '阿布扎比', 'AUH': '阿布扎比',
    'Doha': '多哈', 'DOH': '多哈', 'Riyadh': '利雅得', 'RUH': '利雅得', 'Jeddah': '吉达', 'JED': '吉达',
    'Tel Aviv': '特拉维夫', 'TLV': '特拉维夫', 'Bahrain': '巴林', 'BAH': '巴林',
    'Muscat': '马斯喀特', 'OMH': '马斯喀特', 'Kuwait City': '科威特市', 'KWI': '科威特市',
    'Amman': '安曼', 'AMM': '安曼', 'Beirut': '贝鲁特', 'BEY': '贝鲁特',
    'Aleppo': '阿勒颇', 'ALE': '阿勒颇', 'Damascus': '大马士革', 'DAM': '大马士革',

    // 南美地区 - 城市（城市全名映射 + IATA码）
    'Sao Paulo': '圣保罗', 'GRU': '圣保罗', 'Rio de Janeiro': '里约热内卢', 'GIG': '里约热内卢',
    'Buenos Aires': '布宜诺斯艾利斯', 'EZE': '布宜诺斯艾利斯', 'Santiago': '圣地亚哥', 'SCL': '圣地亚哥',
    'Lima': '利马', 'LIM': '利马', 'Bogota': '波哥大', 'BOG': '波哥大',
    'Medellin': '麦德林', 'MDE': '麦德林', 'Salvador': '圣萨尔瓦多', 'SAO': '圣萨尔瓦多',
    'Caracas': '卡拉卡斯', 'CCS': '卡拉卡斯', 'Asuncion': '亚松森', 'ASU': '亚松森',
    'Montevideo': '蒙得维的亚', 'MVD': '蒙得维的亚',

    // 非洲地区 - 城市（城市全名映射 + IATA码）
    'Johannesburg': '约翰内斯堡', 'JNB': '约翰内斯堡', 'Cape Town': '开普敦', 'CPT': '开普敦',
    'Cairo': '开罗', 'CAI': '开罗', 'Nairobi': '内罗毕', 'NBO': '内罗毕',
    'Addis Ababa': '亚的斯亚贝巴', 'ADD': '亚的斯亚贝巴', 'Alexandria': '亚历山大', 'ALY': '亚历山大',
    'Dar es Salaam': '达累斯萨拉姆', 'DAR': '达累斯萨拉姆', 'Lagos': '拉各斯', 'LOS': '拉各斯',
    'Accra': '阿克拉', 'ACC': '阿克拉', 'Casablanca': '卡萨布兰卡', 'CCS': '卡萨布兰卡',
    'Tunis': '突尼斯', 'TUN': '突尼斯', 'Saint Denis': '圣但尼', 'SFJ': '圣但尼',
    'Seychelles': '塞舌尔', 'SEZ': '塞舌尔', 'Mauritius': '毛里求斯', 'MRU': '毛里求斯',
    'Reunion': '留尼汪', 'RUN': '留尼汪',
};




window.countryNameToChinese = countryNameToChinese;
window.regionCodeToChinese = regionCodeToChinese;