import type { AppState, Task } from '../types/task';
import type { Action } from './actions';

const genId = () =>
  (globalThis.crypto?.randomUUID?.())
  ?? (Date.now().toString(36) + Math.random().toString(36).slice(2));

export const initialAppState: AppState = {
  tasks: [],
  filter: 'all',
  sort: { key: 'createdAt', order: 'desc' },
};

const nowIso = () => new Date().toISOString();

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_TASK': {
      const newTask: Task = {
        id: genId(),
        title: action.title.trim(),
        completed: false,
        createdAt: nowIso(),
        updatedAt: nowIso(),
      };
      if (!newTask.title) return state; // 空文字は無視
      return { ...state, tasks: [newTask, ...state.tasks] };
    }

    case 'TOGGLE_COMPLETE': {
      const tasks = state.tasks.map((t) =>
        t.id === action.id ? { ...t, completed: !t.completed, updatedAt: nowIso() } : t
      );
      return { ...state, tasks };
    }

    case 'DELETE_TASK': {
      const tasks = state.tasks.filter((t) => t.id !== action.id);
      return { ...state, tasks };
    }

    case 'SET_FILTER':
      return { ...state, filter: action.filter };

    case 'SET_SORT':
      return { ...state, sort: action.sort };

    case 'HYDRATE':
      return action.state;

    default:
      return state;
  }
}