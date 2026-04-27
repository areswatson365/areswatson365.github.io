// Mock data extracted/simplified from your app
const MOCK = {
  indices: [
    {代码: 'sh000300', 名称: '沪深300', 最新价: 3842.5, 涨跌幅: 1.2},
    {代码: 'sz399006', 名称: '创业板指', 最新价: 1850.2, 涨跌幅: 2.1},
    {代码: 'sh000688', 名称: '科创50', 最新价: 820.4, 涨跌幅: 2.5}
  ],
  stocks: [
    {代码:'600519', 名称:'贵州茅台', 最新价:1700, 涨跌幅:3.5, 成交额:800000000},
    {代码:'000001', 名称:'平安银行', 最新价:12.3, 涨跌幅:-1.2, 成交额:120000000},
    {代码:'300750', 名称:'宁德时代', 最新价:210.4, 涨跌幅:4.2, 成交额:450000000}
  ],
  strategy: {
    scenario:{name_cn:'科技上行周期', name_en:'Tech Upcycle', desc_cn:'AI 与半导体驱动的强劲上行', desc_en:'AI & Semiconductor-led rally.'},
    portfolio: [
      {code:'300750', name:'宁德时代', type:'Stock', weight:20, reason_cn:'电动车与储能趋势', reason_en:'EV & storage tailwinds'},
      {code:'600519', name:'贵州茅台', type:'Stock', weight:20, reason_cn:'消费避险资产', reason_en:'Defensive consumption pick'},
      {code:'510300', name:'沪深300 ETF', type:'ETF', weight:30, reason_cn:'基础底仓', reason_en:'Core ETF allocation'},
      {code:'CASH', name:'闲置现金', type:'Cash', weight:10, reason_cn:'流动性准备', reason_en:'Cash buffer'}
    ],
    constraints:['单个个股 <= 20%','现金 >= 10%','锁仓 >= 7 天']
  },
  traces:[
    'Scenario detected: Tech Upcycle',
    'Compliance: PASS',
    'Sentiment: Neutral'
  ],
  activity:[
    {time:'14:25', msg:'电子半导体板块出现机构买入信号'},
    {time:'14:10', msg:'上证指数回踩 3100 点'}
  ]
};

function showDashboard(){
  document.getElementById('loader').style.display='none';
  document.getElementById('dashboard').style.display='grid';

  // indices
  const indices = document.getElementById('indices');
  MOCK.indices.forEach(i=>{
    const d = document.createElement('div'); d.className='card';
    d.innerHTML = `<div class="index-value">${i.最新价.toFixed(1)}</div><div class="muted">${i.名称} <span class="${i.涨跌幅>=0?'pct-up':'pct-down'}">${i.涨跌幅>0?'+':''}${i.涨跌幅}%</span></div>`;
    indices.appendChild(d);
  });

  // spot table
  const tbody = document.querySelector('#spot tbody');
  MOCK.stocks.forEach(s=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${s.代码}</td><td>${s.名称}</td><td>${s.最新价.toFixed(2)}</td><td class='${s.涨跌幅>=0?'pct-up':'pct-down'}'>${s.涨跌幅>0?'+':''}${s.涨跌幅}%</td><td>${(s.成交额/100000000).toFixed(2)}</td>`;
    tbody.appendChild(tr);
  });

  // scenario
  const sc = document.getElementById('scenarioCard');
  sc.innerHTML = `<div class='card'><strong>${MOCK.strategy.scenario.name_cn}</strong><p style="color:var(--muted);font-size:13px">${MOCK.strategy.scenario.desc_cn}</p></div>`;

  // portfolio
  const pf = document.getElementById('portfolio');
  pf.innerHTML = MOCK.strategy.portfolio.map(p=>`<div style="margin-bottom:8px"><strong>${p.name}</strong><div style="font-size:13px;color:var(--muted)">${p.code} • ${p.weight}% • ${p.type}</div></div>`).join('');

  // traces
  const trBox = document.getElementById('traces');
  trBox.innerHTML = MOCK.traces.map(t=>`<div style="font-size:13px;color:var(--muted);margin-bottom:6px">&gt; ${t}</div>`).join('');

  // activity
  const act = document.getElementById('activity');
  act.innerHTML = MOCK.activity.map(a=>`<div style="margin-bottom:6px"><div style="font-size:11px;color:var(--muted)">${a.time}</div><div>${a.msg}</div></div>`).join('');
}

// simulate loading
setTimeout(showDashboard, 900);
