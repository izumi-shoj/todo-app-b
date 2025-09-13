import type { AppState, Task } from '../types/task';

export function selectVisibleTasks(state: AppState): Task[] {
  let list = state.tasks;

  // フィルタ
  switch (state.filter) {
    case 'active':
      list = list.filter((t) => !t.completed);
      break;
    case 'done':
      list = list.filter((t) => t.completed);
      break;
    case 'all':
    default:
      // そのまま
      break;
  }

  // 並び替え（createdAtのみ）
  const sorted = [...list].sort((a, b) => {
    const cmp = a.createdAt.localeCompare(b.createdAt);
    return state.sort.order === 'asc' ? cmp : -cmp;
  });

  return sorted;
}

export function selectCounts(state: AppState) {
  const total = state.tasks.length;
  const active = state.tasks.filter((t) => !t.completed).length;
  const done = total - active;
  return { total, active, done };
}