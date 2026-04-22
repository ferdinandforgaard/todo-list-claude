export default function TodoApp() {
  return (
    <div className="todo-app">
      <section className="todo-card" data-testid="todo-card">
        <h1 className="todo-title">Todos</h1>
        <form className="todo-form" onSubmit={(e) => e.preventDefault()}>
          <input
            className="todo-input"
            type="text"
            placeholder="What needs doing?"
            data-testid="todo-input"
          />
          <button
            className="todo-add"
            type="submit"
            data-testid="add-todo"
          >
            Add
          </button>
        </form>
      </section>
    </div>
  );
}
