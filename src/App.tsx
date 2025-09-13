import { useEffect, useReducer } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { initialAppState, reducer } from './app/store/reducer';
import { selectCounts, selectVisibleTasks } from './app/store/selectors';
import type { Filter } from './app/types/task';
import { loadState, saveState } from './storage/localStorageRepo';

export default function App() {
  // 初期化：localStorage の内容があればそれを採用、なければ initialAppState
  const [state, dispatch] = useReducer(
    reducer,
    initialAppState,
    (init) => loadState() ?? init
  );

  // 変更のたびに保存（全体でも良いが、まずはシンプルに）
  useEffect(() => {
    saveState(state);
  }, [state]);

  const visibleTasks = selectVisibleTasks(state);
  const counts = selectCounts(state);

  const setFilter = (filter: Filter) => dispatch({ type: 'SET_FILTER', filter });

  return (
    <div style={{ maxWidth: 720, margin: '24px auto', padding: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h1>ToDo</h1>
        <small>
          全{counts.total}件 / 未完{counts.active}件 / 完了{counts.done}件
        </small>
      </header>

      <section style={{ marginTop: 16 }}>
        <TaskForm onAdd={(title) => dispatch({ type: 'ADD_TASK', title })} />
      </section>

      <section aria-label="Toolbar" style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <FilterButton
          label="すべて"
          active={state.filter === 'all'}
          onClick={() => setFilter('all')}
        />
        <FilterButton
          label="未完"
          active={state.filter === 'active'}
          onClick={() => setFilter('active')}
        />
        <FilterButton
          label="完了"
          active={state.filter === 'done'}
          onClick={() => setFilter('done')}
        />
      </section>

      <section style={{ marginTop: 8 }}>
        <TaskList
          tasks={visibleTasks}
          onToggleComplete={(id) => dispatch({ type: 'TOGGLE_COMPLETE', id })}
          onDelete={(id) => dispatch({ type: 'DELETE_TASK', id })}
        />
      </section>
    </div>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      style={{
        padding: '6px 10px',
        border: active ? '2px solid #444' : '1px solid #ccc',
        background: active ? '#eee' : 'transparent',
        borderRadius: 6,
      }}
    >
      {label}
    </button>
  );
}