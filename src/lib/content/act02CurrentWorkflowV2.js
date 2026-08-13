import { currentFlowNodes } from './siteContent.js';

export const act02Content = Object.freeze({
  eyebrow: 'ACT 02 / CURRENT WORKFLOW',
  title: '現行施工圖作業，實際要做哪些事？',
  lead: '先不談 AI。這一章直接把目前作業拆開來看：收到建商圖面後，繪圖人員如何確認圖面、判斷施工位置、逐段繪製與查看長度，再整理尺寸、施工總長與元件數量。'
});

export const currentFlowStages = Object.freeze([
  Object.freeze({ id: 1, label: '圖面確認與施工判斷', startStep: 1, endStep: 3 }),
  Object.freeze({ id: 2, label: '逐段繪製與標註', startStep: 4, endStep: 6 }),
  Object.freeze({ id: 3, label: '長度、數量與圖面收尾', startStep: 7, endStep: 9 })
]);

const currentFlowCopy = Object.freeze([
  Object.freeze({ id: 1, label: '收到建商圖面，先確認本次處理對象', desc: '先確認這次要處理的圖號、樓層與圖面版本，避免後續作業落在錯的圖面上。', highlights: Object.freeze([{ text: '圖號', tone: 'manual' }, { text: '樓層', tone: 'manual' }, { text: '圖面版本', tone: 'manual' }]) }),
  Object.freeze({ id: 2, label: '以建商原圖作為施工判斷底圖', desc: '將原始 CAD 圖面帶入工作檔，保留既有樓層與圖層資訊，作為後續判斷施工位置的依據。', highlights: Object.freeze([{ text: '原始 CAD 圖面', tone: 'manual' }, { text: '判斷施工位置', tone: 'manual' }]) }),
  Object.freeze({ id: 3, label: '由繪圖人員判斷哪些位置需要施工', desc: '依圖面與工程需求，分辨外部與深井哪些位置屬於本次施工範圍，這一步仍由繪圖人員做工程判斷。', highlights: Object.freeze([{ text: '繪圖人員', tone: 'manual' }, { text: '工程判斷', tone: 'manual' }]) }),
  Object.freeze({ id: 4, label: '依施工位置，逐段畫出施工線', desc: '位置確認後，再沿著實際施工範圍逐段建立線段或聚合線，把工程判斷轉成可計算的 CAD 物件。', highlights: Object.freeze([{ text: '逐段', tone: 'manual' }, { text: 'CAD 物件', tone: 'manual' }]) }),
  Object.freeze({ id: 5, label: '完成繪製後，逐段查看線長', desc: '施工線完成後，需要一段一段點選，再從 AutoCAD 性質面板查看個別長度，才能開始整理本次施工資料。', highlights: Object.freeze([{ text: '一段一段點選', tone: 'manual' }, { text: '個別長度', tone: 'manual' }]) }),
  Object.freeze({ id: 6, label: '把每一段長度重新標回圖面', desc: '確認線長後，再逐段建立尺寸標註，讓每一筆長度回到施工圖上，供後續查看與確認。', highlights: Object.freeze([{ text: '逐段建立尺寸標註', tone: 'manual' }, { text: '查看與確認', tone: 'manual' }]) }),
  Object.freeze({ id: 7, label: '把分散的線長整理成施工總長', desc: '個別長度確認完成後，再將外部與深井分開整理、加總，得到本次施工範圍的長度結果。', highlights: Object.freeze([{ text: '分開整理', tone: 'manual' }, { text: '加總', tone: 'manual' }]) }),
  Object.freeze({ id: 8, label: '再依施工條件整理元件數量', desc: '長度整理完成後，再依公司的施工條件換算或清點需要的施工元件數量，並與圖面互相確認。', highlights: Object.freeze([{ text: '施工條件', tone: 'manual' }, { text: '施工元件數量', tone: 'manual' }]) }),
  Object.freeze({ id: 9, label: '最後完成人工複核與圖面收尾', desc: '最後再確認尺寸、文字、箭頭與圖面位置，完成本次施工圖整理後，才進入正式輸出或後續作業。', highlights: Object.freeze([{ text: '人工複核', tone: 'manual' }, { text: '正式輸出', tone: 'manual' }]) })
]);

const copyById = new Map(currentFlowCopy.map((item) => [item.id, item]));
export const act02ProcessSteps = Object.freeze(currentFlowNodes.map((step) => Object.freeze({ ...step, ...copyById.get(step.id) })));
