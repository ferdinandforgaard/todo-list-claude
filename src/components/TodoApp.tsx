import { useState, type FormEvent } from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [draft, setDraft] = useState('');

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
            <span className="todo-text" data-testid="todo-text">
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
