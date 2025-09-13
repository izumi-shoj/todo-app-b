import { LS_KEY } from '../app/constants';
import type { AppState } from '../app/types/task';

export function loadState(): AppState | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AppState;
    return parsed;
  } catch {
    return null;
  }
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}