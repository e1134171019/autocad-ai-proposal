// 職責：保存跨元件共用的目前 ACT 與有效 CAD 框選狀態。
// 輸入：導覽觀察器與 CadProcess 更新。
// 輸出：可訂閱的 activeAct、activeSelection store。
import { writable } from 'svelte/store';

export const activeAct = writable('act-01');
export const activeSelection = writable(null);
