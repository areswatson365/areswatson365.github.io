// Enhanced mock data with bilingual fields and pro/free visibility
const MOCK = {
  indices: [
    {代码: 'sh000300', 名称: '沪深300', 最新价: 3842.5, 涨跌幅: 1.2},
    {代码: 'sz399006', 名称: '创业板指', 最新价: 1850.2, 涨跌幅: 2.1},
    {代码: 'sh000688', 名称: '科创50', 最新价: 820.4, 涨跌幅: 2.5}
  ],
  stocks: [
    {代码:'600519', 名称:'贵州茅台', 最新价:1700, 涨跌幅:3.5, 成交额:800000000, name_en:'Kweichow Moutai'},
    {代码:'000001', 名称:'平安银行', 最新价:12.3, 涨跌幅:-1.2, 成交额:120000000, name_en:'Ping An Bank'},
    {代码:'300750', 名称:'宁德时代', 最新价:210.4, 涨跌幅:4.2, 成交额:450000000, name_en:'Contemporary Amperex'}
  ],
  strategy: {
    scenario:{name_cn:'科技上行周期', name_en:'Tech Upcycle', desc_cn:'AI 与半导体驱动的强劲上行', desc_en:'AI & Semiconductor-led rally.'},
    portfolio: [
      {code:'300750', name:'宁德时代', name_en:'Contemporary Amperex', type:'Stock', weight:20, reason_cn:'电动车与储能趋势', reason_en:'EV & storage tailwinds'},
      {code:'600519', name:'贵州茅台', name_en:'Kweichow Moutai', type:'Stock', weight:20, reason_cn:'消费避险资产', reason_en:'Defensive consumption pick'},
      {code:'510300', name:'沪深300 ETF', name_en:'CSI300 ETF', type:'ETF', weight:30, reason_cn:'基础底仓', reason_en:'Core ETF allocation'},
      {code:'CASH', name:'闲置现金', name_en:'Cash', type:'Cash', weight:10, reason_cn:'流动性准备', reason_en:'Cash buffer'}
    ],
    constraints:['单个个股 <= 20%','现金 >= 10%','锁仓 >= 7 天']
  },
  traces:[
    {cn:'情景识别：科技上行', en:'Scenario detected: Tech Upcycle'},
    {cn:'合规检测：通过', en:'Compliance: PASS'},
    {cn:'情绪：中性', en:'Sentiment: Neutral'}
  ],
  activity:[
    {time:'14:25', msg_cn:'电子半导体板块出现机构买入信号', msg_en:'Institutions buying semiconductor sector'},
    {time:'14:10', msg_cn:'上证指数回踩 3100 点', msg_en:'SSE revisits 3100 support'}
  ],
  analytics: { sentiment_score: '0.12', northbound_flow: '120M', ai_signal: 'Signal A' }
};

// state
let LANG = localStorage.getItem('demo_lang') || 'zh';
let IS_PRO = localStorage.getItem('demo_is_pro') === 'true';

function setLang(l){
  LANG = l; localStorage.setItem('demo_lang', l);
  document.getElementById('langBtn').textContent = l === 'zh' ? '中' : 'EN';
  renderAll();
}

function togglePro(){
  IS_PRO = !IS_PRO; localStorage.setItem('demo_is_pro', IS_PRO);
  const btn = document.getElementById('proBtn');
  btn.textContent = IS_PRO ? 'PRO' : 'FREE';
  btn.classList.toggle('pro', IS_PRO);
  renderAll();
}

function clearContainers(){
  document.getElementById('indices').innerHTML='';
  document.querySelector('#spot tbody').innerHTML='';
  document.getElementById('scenarioCard').innerHTML='';
  document.getElementById('portfolio').innerHTML='';
  document.getElementById('traces').innerHTML='';
  document.getElementById('activity').innerHTML='';
  document.getElementById('dashboard').style.display='grid';
}

function renderAll(){
  // Unified renderer for SPA: hide loader, show nav/pages and render page components safely
  const loader = document.getElementById('loader'); if(loader) loader.style.display='none';
  try{ navShow(); }catch(e){}
  try{ renderScenarios(); }catch(e){}
  try{ renderStrategyPage(); }catch(e){}
  try{ renderDetails(); }catch(e){}
  try{ renderRebalance(); }catch(e){}
  try{ renderBusiness(); }catch(e){}
  try{ renderCompetitors(); }catch(e){}
  try{ renderProfile(); }catch(e){}
}

// event wiring
document.addEventListener('DOMContentLoaded', ()=>{
  const langBtn = document.getElementById('langBtn');
  const proBtn = document.getElementById('proBtn');
  langBtn.addEventListener('click', ()=> setLang(LANG==='zh'?'en':'zh'));
  proBtn.addEventListener('click', togglePro);
  // init visuals
  langBtn.textContent = LANG==='zh' ? '中' : 'EN';
  proBtn.textContent = IS_PRO ? 'PRO' : 'FREE';
  if(IS_PRO) proBtn.classList.add('pro');
  // small delay to simulate loading
  setTimeout(renderAll, 600);
});

/* --- SPA navigation and full demo flows --- */
const PAGES = ['page1','page2','page3','page4','page5','page6','page7','page8'];
function navShow(){
  document.getElementById('mainNav').style.display='flex';
  document.getElementById('pages').style.display='block';
}

function navigate(to){
  PAGES.forEach(p=> document.getElementById(p).style.display=(p===to?'block':'none'));
  // mark active
  document.querySelectorAll('.nav-btn').forEach(b=> b.classList.toggle('active', b.dataset.page===to));
}

function wireNav(){
  document.querySelectorAll('.nav-btn').forEach(b=> b.addEventListener('click', ()=> navigate(b.dataset.page)));
}

// page1 interactions
function checkFormValidity(){
  const user = document.getElementById('inputUser').value;
  const risk = document.querySelector('input[name=risk]:checked');
  const term = document.querySelector('input[name=term]:checked');
  const ok = user && risk && term;
  document.getElementById('genBtn').disabled = !ok;
}

function resetForm(){
  document.getElementById('inputUser').value='';
  document.querySelectorAll('input[name=risk]').forEach(i=>i.checked=false);
  document.querySelectorAll('input[name=term]').forEach(i=>i.checked=false);
  document.getElementById('genBtn').disabled=true;
}

function simulateGenerate(){
  // gather inputs
  const user = document.getElementById('inputUser').value;
  const risk = document.querySelector('input[name=risk]:checked').value;
  const term = document.querySelector('input[name=term]:checked').value;
  const scenario = localStorage.getItem('demo_selected_scenario') || 'tech';
  // create a portfolio based on risk and scenario (simple mapping)
  const base = JSON.parse(JSON.stringify(MOCK.strategy.portfolio));
  // adjust weights by risk
  base.forEach(p=>{
    if(p.type==='Cash'){
      p.weight = 10;
    } else if(risk==='conservative'){
      if(p.type==='ETF') p.weight +=10; else p.weight = Math.max(5, p.weight-5);
    } else if(risk==='aggressive'){
      if(p.type==='Stock') p.weight +=5;
    }
  });
  // normalize and enforce single stock <=20, cash>=10
  let total = base.reduce((s,x)=>s+x.weight,0);
  base.forEach(p=> p.weight = Math.round(p.weight/total*100));
  // enforce constraints
  base.forEach(p=>{ if(p.type==='Stock' && p.weight>20) p.weight=20; });
  const cash = base.find(p=>p.code==='CASH'); if(cash && cash.weight<10) cash.weight=10;
  // small correction to sum 100
  let sum = base.reduce((s,x)=>s+x.weight,0); let diff = 100-sum; base[0].weight += diff;

  // save generated strategy to localStorage
  localStorage.setItem('demo_generated', JSON.stringify({user, risk, term, scenario, portfolio: base, generated_at: new Date().toISOString()}));
  renderStrategyPage();
  navigate('page3');
}

function renderStrategyPage(){
  const gen = JSON.parse(localStorage.getItem('demo_generated')||'null');
  const sumEl = document.getElementById('strategySummary');
  const listEl = document.getElementById('assetList');
  const compEl = document.getElementById('complianceStatus');
  if(!gen){ sumEl.innerHTML='未生成组合，请返回首页完成配置并生成。'; listEl.innerHTML=''; compEl.innerHTML=''; return; }
  sumEl.innerHTML = `<div class="small">情景：${gen.scenario} • 风险：${gen.risk} • 期限：${gen.term}</div><h3>建议组合（Mock）</h3>`;
  listEl.innerHTML = gen.portfolio.map(p=>`<div class="asset-item"><div><strong>${LANG==='zh'? (p.name || p.name_en): (p.name_en || p.name)}</strong><div class="small">${p.code} • ${p.type}</div></div><div class="small">${p.weight}%</div></div>`).join('');
  compEl.innerHTML = '<div class="small">合规检查：单股≤20%，单行业≤40%，现金≥10%，持仓≥7天（锁仓模拟）</div>';
}

// render scenarios page
function renderScenarios(){
  const list = document.getElementById('scenarioList');
  const detail = document.getElementById('scenarioDetail');
  const S = [
    {id:'growth', cn:'基准增长', en:'Baseline Growth', desc_cn:'经济稳步复苏，政策环境温和。', desc_en:'Steady recovery.'},
    {id:'inflation', cn:'通胀飙升', en:'Surging Inflation', desc_cn:'物价上涨，利率压力。', desc_en:'Prices rising.'},
    {id:'recession', cn:'衰退风险', en:'Recession Risk', desc_cn:'需求收缩，盈利下行。', desc_en:'Demand slows.'},
    {id:'rates', cn:'利率转向', en:'Rate Rotation', desc_cn:'政策利率转向，债市影响。', desc_en:'Rate changes.'},
    {id:'geo', cn:'地缘冲击', en:'Geopolitical Shock', desc_cn:'供应链受阻，避险情绪。', desc_en:'Supply disruptions.'},
    {id:'tech', cn:'科技上行周期', en:'Tech Upcycle', desc_cn:'AI 与半导体推动成长。', desc_en:'AI & semiconductors upcycle.'}
  ];
  list.innerHTML = S.map(s=>`<div class="scenario-item" data-id="${s.id}"><strong>${LANG==='zh'?s.cn:s.en}</strong><div class="small">${LANG==='zh'?s.desc_cn:s.desc_en}</div></div>`).join('');
  list.querySelectorAll('.scenario-item').forEach(el=> el.addEventListener('click', ()=>{
    list.querySelectorAll('.scenario-item').forEach(x=>x.classList.remove('active'));
    el.classList.add('active');
    const id = el.dataset.id; localStorage.setItem('demo_selected_scenario', id);
    const s = S.find(x=>x.id===id);
    detail.innerHTML = `<h4>${LANG==='zh'?s.cn:s.en}</h4><p class="small">${LANG==='zh'?s.desc_cn:s.desc_en}</p><div class="small">情景判断依据（Mock）：均线、波动率、成交量、政策信号。</div><div style="margin-top:8px"><button id="viewPortfolioFromScenario">查看 AI 组合</button></div>`;
    document.getElementById('viewPortfolioFromScenario').addEventListener('click', ()=>{ navigate('page3'); renderStrategyPage(); });
  }));
}

// strategy details
function renderDetails(){
  const box = document.getElementById('strategyDetails');
  const gen = JSON.parse(localStorage.getItem('demo_generated')||'null');
  if(!gen){ box.innerHTML='请先生成组合。'; return; }
  box.innerHTML = `<h3>可解释 AI（XAI）</h3><div class="small">组合生成逻辑：基于情景与风险等级的规则化模版 + XAI 叙述（Mock）。</div><ul><li>多因子说明：价值/成长/动量/质量/波动</li><li>止盈止损：使用日线/周线指标触发</li><li>合规：单股≤20%，单行业≤40%，现金≥10%，锁仓≥7 天</li></ul>`;
}

// rebalance / lock page
function renderRebalance(){
  const lockBox = document.getElementById('lockBox');
  // simulate lock: saved generated_at
  const gen = JSON.parse(localStorage.getItem('demo_generated')||'null');
  if(!gen){ lockBox.innerHTML='无未平仓组合。'; return; }
  // for demo, compute days since generated and show remaining (mock 7 days)
  const created = new Date(gen.generated_at);
  const now = new Date();
  const diffDays = Math.floor((now-created)/86400000);
  const remaining = Math.max(0, 7-diffDays);
  lockBox.innerHTML = `<div class="small">生成时间：${created.toLocaleString()}</div><div style="margin-top:8px"><strong>剩余锁仓天数：${remaining} 天</strong></div>`;
  const hist = document.getElementById('rebalanceHistory');
  hist.innerHTML = `<div class="small">历史记录：</div><ul><li>2026-04-22 生成组合 | 锁仓 7 天</li><li>2026-04-20 通胀情景 | 增配黄金 ETF</li></ul>`;
}

// business model
function renderBusiness(){
  document.getElementById('membershipBox').innerHTML = `<div class="small">权限对比：Free vs Pro</div><ul><li>Free：情景摘要、简易组合</li><li>Pro：多情景对比、回测、动态提醒、XAI 全量</li></ul>`;
  document.getElementById('revenueBox').innerHTML = `<div class="small">收入结构</div><div>订阅: 60% • B2B2C: 25% • 增值: 15%</div>`;
}

// competitors
function renderCompetitors(){
  document.getElementById('competitors').innerHTML = `<ul><li>海外智能投顾：逻辑成熟，本土化不足</li><li>券商工具：流量强，偏交易</li><li>社区平台：热度高，缺纪律</li><li>机构终端：强大但昂贵</li></ul><div class="small">核心差异：情景驱动 + 散户易用 + 可解释 AI</div>`;
}

// profile
function renderProfile(){
  const p = {name:'示例用户', member: localStorage.getItem('demo_is_pro')==='true' ? '订阅用户':'免费用户'};
  document.getElementById('profileBox').innerHTML = `<div><strong>${p.name}</strong><div class="small">会员等级：${p.member}</div></div>`;
}

// initial boot to wire SPA after renderAll
function bootSPA(){
  navShow(); wireNav(); document.getElementById('mainNav').style.display='flex';
  document.getElementById('pages').style.display='block';
  document.getElementById('mainNav').style.display='flex';
  // show page1 by default
  navigate('page1');
  // wire form events
  document.getElementById('inputUser').addEventListener('change', checkFormValidity);
  document.querySelectorAll('input[name=risk]').forEach(i=>i.addEventListener('change', checkFormValidity));
  document.querySelectorAll('input[name=term]').forEach(i=>i.addEventListener('change', checkFormValidity));
  document.getElementById('resetBtn').addEventListener('click', resetForm);
  document.getElementById('genBtn').addEventListener('click', simulateGenerate);
  // wire scenario rendering
  renderScenarios(); renderBusiness(); renderCompetitors(); renderProfile();
  // wire other pages rendering hooks
  document.getElementById('refreshSim').addEventListener('click', ()=>{ renderRebalance(); alert('已刷新模拟（Mock）'); });
}

// run boot after renderAll completes
setTimeout(()=>{ bootSPA(); }, 900);
