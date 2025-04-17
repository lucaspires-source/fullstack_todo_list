import { useTodos } from './hooks/useTodos';
import { TodoList } from './components/TodoList';
import { AddTodo } from './components/AddTodo';
import { TodoFilter } from './components/TodoFIlter';

 const App = () => {
  const {
    todos,
    loading,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    remaining,
    updateTodoTitle
  } = useTodos();

  return (
    <div className="todo-app">
      <h1>Todo List ({remaining} remaining)</h1>
      <AddTodo onAdd={addTodo} />
      <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdateTitle={updateTodoTitle}
        />
      )}
    </div>
  );
};

export default App