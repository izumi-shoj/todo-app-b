export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Filter = 'all' | 'active' | 'done';

export type NewTask = Omit<Task, 'id' | 'completed' | 'createdAt' | 'updatedAt'>;

export type SorKey = 'createdAt';
export type SortOrder = 'asc' | 'desc';
export type Sort = {  key: SorKey;  order: SortOrder; };

export type AppState = {
  tasks: Task[];
  filter: Filter;
  sort: Sort;
};