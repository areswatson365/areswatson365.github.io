const MOCK_DATA = {
    marketStatus: {
        free: {
            "success": true,
            "indices": [
                {"代码": "sh000300", "名称": "沪深300", "最新价": 3842.5, "涨跌幅": 1.2},
                {"代码": "sz399006", "名称": "创业板指", "最新价": 1850.2, "涨跌幅": 2.1},
                {"代码": "sh000688", "名称": "科创50", "最新价": 820.4, "涨跌幅": 2.5},
                {"代码": "sh000001", "名称": "上证指数", "最新价": 3050.8, "涨跌幅": 0.8}
            ],
            "analytics": {
                "sentiment_score": "Locked",
                "northbound_flow": "Locked",
                "ai_signal": "Upgrade to View"
            }
        },
        pro: {
            "success": true,
            "indices": [
                {"代码": "sh000300", "名称": "沪深300", "最新价": 3845.2, "涨跌幅": 1.25},
                {"代码": "sz399006", "名称": "创业板指", "最新价": 1855.8, "涨跌幅": 2.34},
                {"代码": "sh000688", "名称": "科创50", "最新价": 822.1, "涨跌幅": 2.67},
                {"代码": "sh000001", "名称": "上证指数", "最新价": 3052.4, "涨跌幅": 0.85}
            ],
            "analytics": {
                "sentiment_score": 78,
                "northbound_flow": "+45.2亿",
                "ai_signal": "STRONG BUY"
            }
        }
    },
    news: {
        "success": true,
        "data": [
            {"id": 1, "time": "14:45", "title_cn": "电子半导体板块出现机构买入信号", "title_en": "Semiconductor sector sees institutional buying signals"},
            {"id": 2, "time": "14:10", "title_cn": "上证指数回踩 3100 点支撑有效", "title_en": "SSE Index tests 3100 support successfully"},
            {"id": 3, "time": "13:55", "title_cn": "锂电池产业链调研热度显著上升", "title_en": "Lithium battery chain research heat rises significantly"}
        ]
    },
    backtest: {
        "success": true,
        "metrics": {
            "total_return": "+24.8%",
            "max_drawdown": "-8.2%",
            "sharpe": "1.92",
            "win_rate": "62.5%"
        }
    },
    spot: {
        "success": true,
        "data": [
            {"代码": "600519", "名称": "贵州茅台", "最新价": 1650.0, "涨跌幅": 0.5, "成交额": 12000000},
            {"代码": "300750", "名称": "宁德时代", "最新价": 158.5, "涨跌幅": 2.1, "成交额": 45000000},
            {"代码": "601318", "名称": "中国平安", "最新价": 42.3, "涨跌幅": -0.2, "成交额": 89000000},
            {"代码": "000001", "名称": "平安银行", "最新价": 10.5, "涨跌幅": 0.1, "成交额": 150000000},
            {"代码": "600036", "名称": "招商银行", "最新价": 32.8, "涨跌幅": 1.5, "成交额": 67000000}
        ]
    },
    recommend: {
        free: {
            "success": true,
            "scenario": {"name_cn": "基准增长", "name_en": "Baseline Growth", "desc_cn": "经济稳步复苏，政策环境温和。", "desc_en": "Steady recovery with moderate policy."},
            "portfolio": [
                {"code": "600519", "name": "贵州茅台", "weight": 20, "type": "Stock", "reason_cn": "白马龙头，流动性溢价。", "reason_en": "Blue-chip leader, liquidity premium."},
                {"code": "510300", "name": "沪深300ETF", "weight": 30, "type": "ETF", "reason_cn": "底仓配置，防御属性。", "reason_en": "Core allocation, defensive properties."},
                {"code": "300750", "name": "宁德时代", "weight": 15, "type": "Stock", "reason_cn": "成长赛道龙头。", "reason_en": "Growth sector leader."},
                {"code": "CASH", "name": "空仓现金", "weight": 35, "type": "Cash", "reason_cn": "保持流动性。", "reason_en": "Maintain liquidity."}
            ],
            "is_locked": true,
            "holding_days": 3,
            "days_remaining": 4,
            "constraints": ["单股 <= 20%", "现金 >= 10%", "锁定 >= 7天"]
        },
        pro: {
            "success": true,
            "scenario": {"name_cn": "科技上行周期", "name_en": "Tech Upcycle", "desc_cn": "AI与半导体技术突破驱动。", "desc_en": "Driven by AI and semiconductor breakthroughs."},
            "portfolio": [
                {"code": "600519", "name": "贵州茅台", "weight": 20, "type": "Stock", "reason_cn": "白马龙头，流动性溢价。", "reason_en": "Blue-chip leader, liquidity premium."},
                {"code": "300750", "name": "宁德时代", "weight": 25, "type": "Stock", "reason_cn": "成长赛道龙头。", "reason_en": "Growth sector leader."},
                {"code": "002415", "name": "海康威视", "weight": 15, "type": "Stock", "reason_cn": "AI视觉龙头。", "reason_en": "AI Vision leader."},
                {"code": "CASH", "name": "空仓现金", "weight": 40, "type": "Cash", "reason_cn": "保持流动性。", "reason_en": "Maintain liquidity."}
            ],
            "is_locked": false,
            "holding_days": 10,
            "days_remaining": 0,
            "constraints": ["单股 <= 20%", "现金 >= 10%", "锁定 >= 7天"]
        }
    }
};

window.MOCK_DATA = MOCK_DATA;
