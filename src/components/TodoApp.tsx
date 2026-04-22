import { useState } from 'react';
import type { FormEvent } from 'react';

type Todo = {
  id: number;
  text: string;
};

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState('');

  const handleAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = value.trim();
    if (!text) return;
    setTodos((prev) => [...prev, { id: Date.now() + Math.random(), text }]);
    setValue('');
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-card" data-testid="todo-card">
      <h1 className="todo-title">Todos</h1>
      <form className="todo-input-row" onSubmit={handleAdd}>
        <input
          type="text"
          className="todo-input"
          placeholder="What needs doing?"
          data-testid="todo-input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <button type="submit" className="todo-add" data-testid="add-todo">
          Add
        </button>
      </form>
      <ul className="todo-list" data-testid="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item" data-testid="todo-item">
            <span className="todo-text">{todo.text}</span>
            <button
              type="button"
              className="todo-delete"
              data-testid="delete-todo"
              aria-label={`Delete ${todo.text}`}
              onClick={() => handleDelete(todo.id)}
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
        ))}
      </ul>
    </div>
  );
}
