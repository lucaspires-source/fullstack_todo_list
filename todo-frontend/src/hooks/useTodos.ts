import { useState, useEffect } from 'react';
import { TodoService } from '../services/api';
import type { Todo } from '../types/todo';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  console.log(todos)
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await TodoService.getAll();
        setTodos(response.data);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (title: string) => {
    try {
        console.log(title)
      const response = await TodoService.create(title);
      
      setTodos(prevTodos => [
        ...prevTodos, 
        {
          ...response.data,
          createdAt: response.data.createdAt.toString(),
          updatedAt: response.data.updatedAt.toString()
        }
      ]);
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      const response = await TodoService.update(id, { completed: !todo.completed });
      setTodos(todos.map(t => t.id === id ? response.data : t));
    }
  };

  const deleteTodo = async (id: number) => {
    await TodoService.delete(id);
    setTodos(todos.filter(t => t.id !== id));
  };

  const updateTodoTitle = async (id: number, newTitle: string) => {
    try {
      console.log('çhamou update')
      const response = await TodoService.updateTitle(id, newTitle );
      setTodos(todos.map(t => t.id === id ? response.data : t));
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const filteredTodos = todos.filter(todo => 
    filter === 'all' ? true :
    filter === 'active' ? !todo.completed : todo.completed
  );

  return {
    todos: filteredTodos,
    loading,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodoTitle,
    remaining: todos.filter(t => !t.completed).length
  };
};