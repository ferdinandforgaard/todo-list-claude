import { useState, type FormEvent } from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  dueDate?: string; // YYYY-MM-DD
};

const today = new Date().toISOString().split('T')[0];

function formatDueDate(dueDate: string) {
  const date = new Date(dueDate + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [draft, setDraft] = useState('');
  const [draftDueDate, setDraftDueDate] = useState('');

  function handleAdd(event: FormEvent) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setTodos((current) => [
      ...current,
      { id: Date.now(), text, completed: false, dueDate: draftDueDate || undefined },
    ]);
    setDraft('');
    setDraftDueDate('');
  }

  function toggleTodo(id: number) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function deleteTodo(id: number) {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }

  return (
    <div className="todo-card" data-testid="todo-card">
      <h1 className="todo-title">Todos</h1>
      <form className="todo-form" onSubmit={handleAdd}>
        <div className="todo-input-row">
          <input
            type="text"
            className="todo-input"
            placeholder="What needs doing?"
            data-testid="todo-input"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
          <button type="submit" className="todo-add" data-testid="add-todo">
            Add
          </button>
        </div>
        <div className="todo-date-row">
          <label className="todo-date-label" htmlFor="due-date-input">
            Due date
          </label>
          <input
            type="date"
            id="due-date-input"
            className="todo-date-input"
            data-testid="due-date-input"
            value={draftDueDate}
            onChange={(event) => setDraftDueDate(event.target.value)}
          />
        </div>
      </form>
      <ul className="todo-list" data-testid="todo-list">
        {todos.map((todo) => {
          const isOverdue = !!todo.dueDate && !todo.completed && todo.dueDate < today;
          return (
            <li
              key={todo.id}
              className={`todo-item${todo.completed ? ' todo-item--completed' : ''}`}
              data-testid="todo-item"
            >
              <input
                type="checkbox"
                className="todo-checkbox"
                data-testid="todo-checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <div className="todo-content">
                <span className="todo-text" data-testid="todo-text">
                  {todo.text}
                </span>
                {todo.dueDate && (
                  <span
                    className={`todo-due-date${isOverdue ? ' todo-due-date--overdue' : ''}`}
                    data-testid="todo-due-date"
                  >
                    Due {formatDueDate(todo.dueDate)}
                  </span>
                )}
              </div>
              <button
                type="button"
                className="todo-delete"
                data-testid="delete-todo"
                aria-label={`Delete ${todo.text}`}
                onClick={() => deleteTodo(todo.id)}
              >
                <svg
                  className="todo-delete-icon"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
