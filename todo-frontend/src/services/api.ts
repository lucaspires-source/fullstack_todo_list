import axios from 'axios';
import { Todo } from '../types/todo';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ||   '/api',
});

export const TodoService = {
  getAll: () => api.get<Todo[]>('/todos'),
  create: (title: string) => api.post<Todo>('/todos', { title }),
  update: (id: number, updates: Partial<Omit<Todo, 'id'>>) => 
    api.put<Todo>(`/todos/${id}`, updates),
  delete: (id: number) => api.delete(`/todos/${id}`),
  clearCompleted: () => api.delete('/todos/clear-completed'),
  updateTitle: (id: number, title: string) => 
  api.put<Todo>(`/todos/${id}/title`, { title }),
};