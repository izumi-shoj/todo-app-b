import type { AppState, Filter, Sort } from '../types/task';

export type AddTaskAction = { type: 'ADD_TASK'; title: string };
export type ToggleCompleteAction = { type: 'TOGGLE_COMPLETE'; id: string };
export type DeleteTaskAction = { type: 'DELETE_TASK'; id: string };
export type SetFilterAction = { type: 'SET_FILTER'; filter: Filter };
export type SetSortAction = { type: 'SET_SORT'; sort: Sort };
export type HydrateAction = { type: 'HYDRATE'; state: AppState };

export type Action =
  | AddTaskAction
  | ToggleCompleteAction
  | DeleteTaskAction
  | SetFilterAction
  | SetSortAction
  | HydrateAction;
  