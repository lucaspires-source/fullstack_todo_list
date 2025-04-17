import { TodoItem } from './TodoItem';
import { Todo } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdateTitle: (id: number, newTitle: string) => void;
}

export const TodoList = ({ todos, onToggle, onDelete ,onUpdateTitle}: TodoListProps) => {
  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <div className="empty-state">No todos found</div>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdateTitle={onUpdateTitle}
          />
        ))
      )}
    </div>
  );
};