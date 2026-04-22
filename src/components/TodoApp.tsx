export default function TodoApp() {
  return (
    <div className="todo-card" data-testid="todo-card">
      <h1 className="todo-title">Todos</h1>
      <div className="todo-input-row">
        <input
          type="text"
          className="todo-input"
          placeholder="What needs doing?"
          data-testid="todo-input"
        />
        <button type="button" className="todo-add" data-testid="add-todo">
          Add
        </button>
      </div>
    </div>
  );
}
