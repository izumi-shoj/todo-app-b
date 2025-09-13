import { useState } from 'react';

type Props = {
  onAdd: (title: string) => void;
};

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(title);
    setTitle(''); 
  };

  return (
    <form onSubmit={submit} aria-label="Add task form" style={{ display: 'flex', gap: 8 }}>
      <input
        type="text"
        placeholder="タスクを入力して Enter"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Task title"
      />
      <button type="submit" disabled={!title.trim()}>
        追加
      </button>
    </form>
  );
}