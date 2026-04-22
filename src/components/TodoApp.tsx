import { useState, useRef, type FormEvent, type KeyboardEvent } from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [draft, setDraft] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);

  function handleAdd(event: FormEvent) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setTodos((current) => [
      ...current,
      { id: Date.now(), text, completed: false },
    ]);
    setDraft('');
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

  function startEdit(todo: Todo) {
    setEditingId(todo.id);
    setEditDraft(todo.text);
    // Focus happens after render via autoFocus on the input
  }

  function saveEdit(id: number) {
    const text = editDraft.trim();
    if (text) {
      setTodos((current) =>
        current.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
      );
    }
    setEditingId(null);
    setEditDraft('');
  }

  function cancelEdit() {
    setEditingId(null);
    setEditDraft('');
  }

  function handleEditKeyDown(event: KeyboardEvent, id: number) {
    if (event.key === 'Enter') {
      event.preventDefault();
      saveEdit(id);
    } else if (event.key === 'Escape') {
      cancelEdit();
    }
  }

  return (
    <div className="todo-card" data-testid="todo-card">
      <h1 className="todo-title">Todos</h1>
      <form className="todo-input-row" onSubmit={handleAdd}>
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
      </form>
      <ul className="todo-list" data-testid="todo-list">
        {todos.map((todo) => (
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
            {editingId === todo.id ? (
              <input
                ref={editInputRef}
                type="text"
                className="todo-edit-input"
                data-testid="todo-edit-input"
                value={editDraft}
                autoFocus
                onChange={(e) => setEditDraft(e.target.value)}
                onBlur={() => saveEdit(todo.id)}
                onKeyDown={(e) => handleEditKeyDown(e, todo.id)}
              />
            ) : (
              <span
                className="todo-text"
                data-testid="todo-text"
                onDoubleClick={() => startEdit(todo)}
                title="Double-click to edit"
              >
                {todo.text}
              </span>
            )}
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
        ))}
      </ul>
    </div>
  );
}
