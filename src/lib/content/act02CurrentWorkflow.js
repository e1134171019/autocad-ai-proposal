// 職責：在不改動 main 繼承動畫契約的前提下，提供 ACT02 客戶導向文案與三階段閱讀資訊。
// 輸入：siteContent.js 的 currentFlowNodes。
// 輸出：act02Content、currentFlowStages、act02ProcessSteps。
import { currentFlowNodes } from './siteContent.js';

export const act02Content = Object.freeze({
  eyebrow: 'ACT 02 / CURRENT WORKFLOW',
  title: '目前施工圖作業流程',
  lead: '從建商圖面導入、施工範圍判斷與繪製，到逐段查看長度、建立標註、整理總長與施工數量，依目前作業方式逐步呈現。'
});

export const currentFlowStages = Object.freeze([
  Object.freeze({ id: 1, label: '準備與判斷', startStep: 1, endStep: 3 }),
  Object.freeze({ id: 2, label: '繪製與標註', startStep: 4, endStep: 6 }),
  Object.freeze({ id: 3, label: '整理與確認', startStep: 7, endStep: 9 })
]);

const currentFlowCopy = Object.freeze([
  Object.freeze({
    id: 1,
    label: '建商提供原始 CAD 圖面',
    desc: '確認本次施工樓層與圖面版本。',
    highlights: Object.freeze([{ text: '施工樓層', tone: 'manual' }, { text: '圖面版本', tone: 'manual' }])
  }),
  Object.freeze({
    id: 2,
    label: '導入建商圖面',
    desc: '將原始 CAD 圖面作為施工位置判斷與後續繪製的底圖。',
    highlights: Object.freeze([{ text: '原始 CAD 圖面', tone: 'manual' }])
  }),
  Object.freeze({
    id: 3,
    label: '判斷施工範圍',
    desc: '由繪圖人員依工程需求判斷外部與深井需要施工的位置。',
    highlights: Object.freeze([{ text: '繪圖人員', tone: 'manual' }, { text: '判斷', tone: 'manual' }])
  }),
  Object.freeze({
    id: 4,
    label: '繪製施工線',
    desc: '沿施工範圍逐段繪製線段或聚合線。',
    highlights: Object.freeze([{ text: '逐段繪製', tone: 'manual' }])
  }),
  Object.freeze({
    id: 5,
    label: '逐段查看長度',
    desc: '繪圖完成後，需要逐段點選施工線，從 AutoCAD 性質面板查看每一段長度。',
    highlights: Object.freeze([{ text: '逐段點選', tone: 'manual' }, { text: '性質面板', tone: 'manual' }])
  }),
  Object.freeze({
    id: 6,
    label: '逐段建立尺寸標註',
    desc: '每一段施工線再分別建立尺寸，將長度標示在圖面上。',
    highlights: Object.freeze([{ text: '分別建立尺寸', tone: 'manual' }])
  }),
  Object.freeze({
    id: 7,
    label: '人工整理施工總長',
    desc: '將各段長度分別記錄，再整理外部、深井與本次施工總長。',
    highlights: Object.freeze([{ text: '分別記錄', tone: 'manual' }, { text: '施工總長', tone: 'manual' }])
  }),
  Object.freeze({
    id: 8,
    label: '人工整理施工數量',
    desc: '依公司的施工條件，換算或清點需要的施工元件數量。',
    highlights: Object.freeze([{ text: '施工條件', tone: 'manual' }, { text: '施工元件數量', tone: 'manual' }])
  }),
  Object.freeze({
    id: 9,
    label: '完成圖面整理',
    desc: '最後確認尺寸、文字與圖面位置，完成本次施工圖整理。',
    highlights: Object.freeze([{ text: '最後確認', tone: 'manual' }])
  })
]);

const copyById = new Map(currentFlowCopy.map((item) => [item.id, item]));

export const act02ProcessSteps = Object.freeze(
  currentFlowNodes.map((step) => Object.freeze({ ...step, ...copyById.get(step.id) }))
);
