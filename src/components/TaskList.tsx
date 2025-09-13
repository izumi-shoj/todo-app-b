import type { Task } from '../app/types/task';

type Props = {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskList({ tasks, onToggleComplete, onDelete }: Props) {
  if (tasks.length === 0) {
    return <p style={{ opacity: 0.7 }}>タスクはありません</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, marginTop: 12 }}>
      {tasks.map((t) => (
        <li key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
          <input
            type="checkbox"
            checked={t.completed}
            onChange={() => onToggleComplete(t.id)}
            aria-label={`完了切替: ${t.title}`}
          />
          <span
            style={{
              textDecoration: t.completed ? 'line-through' : 'none',
              opacity: t.completed ? 0.6 : 1,
              flex: 1,
            }}
          >
            {t.title}
          </span>
          <button onClick={() => onDelete(t.id)} aria-label={`削除: ${t.title}`}>
            削除
          </button>
        </li>
      ))}
    </ul>
  );
}