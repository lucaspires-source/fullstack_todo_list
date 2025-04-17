import { FiCheck, FiTrash, FiEdit } from 'react-icons/fi';
import { Todo } from '../types/todo';
import { useState } from 'react';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdateTitle: (id: number, newTitle: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete, onUpdateTitle }: TodoItemProps) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleTitleUpdate = () => {
    if (title.trim() && title !== todo.title) {
      console.log(title)
      onUpdateTitle(todo.id, title.trim());
    }
    setEditing(false);
  };

  return (
    <div
      className="todo-item"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem',
        margin: '0.5rem 0',
        background: '#fff',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
      }}
    >
      <div
        className="todo-content"
        style={{ display: 'flex', alignItems: 'center', flex: 1 }}
      >
        <button
          onClick={() => onToggle(todo.id)}
          style={{
            width: '20px',
            height: '20px',
            border: '2px solid #ccc',
            borderRadius: '4px',
            marginRight: '1rem',
            cursor: 'pointer',
            background: todo.completed ? '#4CAF50' : 'transparent',
            color: todo.completed ? 'black' : 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {todo.completed && <FiCheck size={14} color="red"/>}
        </button>
        {editing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleUpdate}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleTitleUpdate();
              }
            }}
            autoFocus
            style={{
              flex: 1,
              padding: '0.4rem 0.6rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem',
            }}
          />
        ) : (
          <span
            style={{
              flex: 1,
              textDecoration: todo.completed ? 'line-through' : 'none',
              opacity: todo.completed ? 0.7 : 1,
              wordBreak: 'break-word',
              color:'black'
            }}
          >
            {todo.title}
          </span>
        )}
      </div>
      <div
        className="todo-actions"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <button
          onClick={() => setEditing(true)}
          style={{
            marginLeft: '0.2rem',
            marginTop:'0.2rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
        >
          <FiEdit size={16} color="#007bff" />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          style={{
            marginLeft: '0.2rem',
            marginTop:'0.2rem',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
        >
          <FiTrash size={16} color="#e53935" />
        </button>
      </div>
    </div>
  );
};
