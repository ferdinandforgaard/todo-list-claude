import { useState, type FormEvent } from 'react';

type Todo = {
  id: number;
  text: string;
};

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  function handleAdd(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;
    setTodos((current) => [...current, { id: Date.now() + Math.random(), text }]);
    setInput('');
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
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button type="submit" className="todo-add" data-testid="add-todo">
          Add
        </button>
      </form>
      {todos.length > 0 && (
        <ul className="todo-list" data-testid="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item" data-testid="todo-item">
              {todo.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
