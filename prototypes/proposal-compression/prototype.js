const currentSteps = [
  { id: 1, label: '建商提供原始 CAD 圖面', owner: '輸入', desc: '建商提供平面圖、立面圖與剖面圖，繪圖人員先確認本次要處理的樓層與圖面版本。' },
  { id: 2, label: '導入建商圖面與原始圖層', owner: '人工', desc: '將建商提供的 CAD 圖面導入工作檔，保留原本的樓層與圖層資料，作為後續判斷施工範圍與繪製施工線的底圖。' },
  { id: 3, label: '判斷外部與深井的施工範圍', owner: '人工判斷', desc: '人工判斷建築外部與內部深井的位置，作為後續繪製與標註的依據。' },
  { id: 4, label: '沿施工範圍繪製線段或聚合線', owner: '人工繪製', desc: '繪圖人員依照圖面與繪圖方式，使用線段或聚合線逐段繪製施工範圍。' },
  { id: 5, label: '逐段從性質面板查看長度', owner: '人工查看', desc: '繪圖人員逐段點選線段或聚合線，再從性質面板查看每一段長度。' },
  { id: 6, label: '逐段建立尺寸與人工記錄', owner: '人工標註', desc: '每次先點選線段，再建立尺寸標註，右側人工記錄隨每一筆完成逐個增加。' },
  { id: 7, label: '人工加總外部與內部深井長度', owner: '人工計算', desc: '依逐段記錄分別加總外部與內部深井長度。' },
  { id: 8, label: '依長度人工換算施工數量', owner: '人工換算', desc: '依公司施工條件人工換算外部三角補強等構件數量，並再次確認圖面與計算結果。' },
  { id: 9, label: '調整線條、文字及圖面位置', owner: '人工整理', desc: '最後再人工調整箭頭、文字、尺寸與圖面配置，完成施工圖整理。' }
];

const proposedSteps = [
  { id: 1, label: '建商提供原始 CAD 圖面', owner: '輸入', desc: '平面圖、立面圖與剖面圖，流程起點不變。' },
  { id: 2, label: '啟動外掛後，自動建立標準圖層', owner: '程式', desc: '外掛建立 AI-EXTERIOR、AI-SHAFT、AI-DIM 與 AI-BRACE 等標準圖層，作為後續規則分類與程式計算依據。' },
  { id: 3, label: '繪圖人員判斷施工位置', owner: '人工判斷', desc: '繪圖人員依建商圖面與施工需求，判斷外部與深井哪些位置需要施工。' },
  { id: 4, label: '使用外掛工具列繪製施工範圍', owner: '人工繪製', desc: '外部施工線與深井仍由繪圖人員依工程判斷逐段繪製，AI 不代替繪圖；完成物件後系統才讀取長度並帶入尺寸資料。' },
  { id: 5, label: '選擇工具，自動帶入標準圖層、顏色與線寬', owner: '程式輔助', desc: '繪圖人員選擇外部線或深井工具後，系統帶入對應標準圖層、顏色與線寬，不需要另外切換設定。' },
  { id: 6, label: '外掛工具列提供專用功能按鈕', owner: '操作介面', desc: '外部線、深井、建立標註、更新標註與自動計算等常用操作集中在專用按鈕。' },
  { id: 7, label: '框選範圍定義本次計算區域', owner: '人工定義邊界', desc: '框選施工範圍作為本次計算邊界；系統後續只針對範圍內、符合標準圖層條件的物件處理。' },
  { id: 8, label: '框選後才顯示分類與計算結果', owner: 'C# / Rule Engine', desc: '先完成框選，再由確定性規則依標準圖層篩選、分類、加總長度與整理數量；這些數值在任何 AI 查詢之前就已由程式完成。' },
  { id: 9, label: '逐段編號，長度與元件分開整理', owner: 'C# / Rule Engine', desc: '每段施工線保留編號與長度，長度物件與施工元件分開整理，並保留分類與忽略依據。' },
  { id: 10, label: '重新框選後，由 AI 助理查詢既有結果', owner: 'AI Assistant', desc: '框選有效後，AI 助理只使用已完成的確定性計算結果進行查詢、解釋、摘要與可追溯說明，不重新計算工程數值。' },
  { id: 11, label: '繪圖人員確認計算結果', owner: '人工確認', desc: '繪圖人員確認獨立長度、分類合計、構件數量與忽略原因，必要時返回圖面修正。' },
  { id: 12, label: '在 AutoCAD 內原生輸出圖面及 PDF 報告', owner: '輸出', desc: '確認後輸出圖面與 PDF 報告，保留框選範圍、圖層依據、獨立長度、加總與數量結果。' }
];

const pad = (value) => String(value).padStart(2, '0');

function visualMarkup(mode, step) {
  const isManual = mode === 'current';
  let label = isManual ? '人工記錄 / 性質面板' : 'AutoCAD + 外掛';
  let selection = '';
  let sequence = '';

  if (!isManual && step.id >= 7) {
    selection = '<div class="visual-selection"></div>';
  }

  if (!isManual && step.id === 8) {
    label = 'Rule Engine / Result';
    sequence = '<div class="visual-sequence"><b>01 FRAME</b><span>框選邊界</span><b>02 CALC</b><span>確定性計算</span><b>03 RESULT</b><span>結果建立</span></div>';
  } else if (!isManual && step.id === 10) {
    label = 'AI Assistant / Query';
    sequence = '<div class="visual-sequence"><b>01 RESULT</b><span>既有結果</span><b>02 QUERY</b><span>AI 查詢</span><b>03 EXPLAIN</b><span>解釋摘要</span></div>';
  } else if (!isManual && step.id === 7) {
    label = 'Selection Boundary';
    sequence = '<div class="visual-sequence"><b>01 HUMAN</b><span>框選範圍</span><b>02 BOUNDARY</b><span>建立邊界</span><b>03 NEXT</b><span>交給規則引擎</span></div>';
  } else if (isManual && step.id >= 5 && step.id <= 8) {
    sequence = '<div class="visual-sequence manual-sequence"><b>01 SELECT</b><span>逐段點選</span><b>02 RECORD</b><span>人工記錄</span><b>03 SUM</b><span>人工加總</span></div>';
  }

  return `
    <div class="visual-building"></div>
    ${selection}
    <div class="visual-panel" data-label="${label}"></div>
    ${sequence}
  `;
}

function renderStepper(rootId, steps, mode) {
  const root = document.getElementById(rootId);
  if (!root) return;

  let currentIndex = 0;

  root.innerHTML = `
    <div class="stepper-shell">
      <div class="step-rail" role="tablist" aria-label="${mode === 'current' ? '目前流程' : '提案流程'}步驟">
        ${steps.map((step, index) => `
          <button class="step-tab" type="button" role="tab" data-index="${index}" aria-selected="${index === 0}">
            <span class="step-num">${pad(step.id)}</span>
            <strong>${step.label}</strong>
          </button>
        `).join('')}
      </div>
      <article class="step-stage">
        <p class="step-owner"></p>
        <h3></h3>
        <p class="step-desc"></p>
        <div class="step-visual ${mode === 'current' ? 'manual' : 'proposed'}" aria-hidden="true"></div>
        <div class="step-actions">
          <button type="button" data-action="prev">上一個</button>
          <span></span>
          <button type="button" data-action="next">下一個</button>
        </div>
      </article>
    </div>
  `;

  const tabs = [...root.querySelectorAll('.step-tab')];
  const owner = root.querySelector('.step-owner');
  const title = root.querySelector('.step-stage h3');
  const desc = root.querySelector('.step-desc');
  const visual = root.querySelector('.step-visual');
  const counter = root.querySelector('.step-actions span');
  const prev = root.querySelector('[data-action="prev"]');
  const next = root.querySelector('[data-action="next"]');

  function update(index) {
    currentIndex = Math.max(0, Math.min(index, steps.length - 1));
    const step = steps[currentIndex];
    owner.textContent = `${mode === 'current' ? 'CURRENT' : 'PROPOSED'} / ${step.owner}`;
    title.textContent = step.label;
    desc.textContent = step.desc;
    visual.innerHTML = visualMarkup(mode, step);
    counter.textContent = `STEP ${pad(step.id)} / ${pad(steps.length)}`;
    prev.disabled = currentIndex === 0;
    next.disabled = currentIndex === steps.length - 1;
    tabs.forEach((tab, tabIndex) => tab.setAttribute('aria-selected', String(tabIndex === currentIndex)));
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => update(Number(tab.dataset.index)));
  });
  prev.addEventListener('click', () => update(currentIndex - 1));
  next.addEventListener('click', () => update(currentIndex + 1));
  update(0);
}

function setActiveSection(id) {
  document.querySelectorAll('.act-nav [data-act]').forEach((link) => {
    link.classList.toggle('active', link.dataset.act === id);
  });
}

function toggleResponsibility(key) {
  const cards = [...document.querySelectorAll('[data-responsibility]')];
  const details = [...document.querySelectorAll('[data-detail]')];
  cards.forEach((card) => {
    const active = card.dataset.responsibility === key;
    card.classList.toggle('active', active);
    card.setAttribute('aria-expanded', String(active));
  });
  details.forEach((detail) => {
    detail.hidden = detail.dataset.detail !== key;
  });
}

function bindNavigation() {
  const links = [...document.querySelectorAll('.act-nav [data-act]')];
  links.forEach((link) => {
    link.addEventListener('click', () => setActiveSection(link.dataset.act));
  });

  const sections = [...document.querySelectorAll('[data-act-section]')];
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActiveSection(visible.target.id);
  }, { rootMargin: '-28% 0px -56% 0px', threshold: [0, 0.18, 0.35, 0.6] });
  sections.forEach((section) => observer.observe(section));
}

function bindResponsibilities() {
  document.querySelectorAll('[data-responsibility]').forEach((button) => {
    button.addEventListener('click', () => toggleResponsibility(button.dataset.responsibility));
  });
  toggleResponsibility('human');
}

document.addEventListener('DOMContentLoaded', () => {
  renderStepper('current-stepper', currentSteps, 'current');
  renderStepper('proposed-stepper', proposedSteps, 'proposed');
  bindNavigation();
  bindResponsibilities();
});
