import { TodoRepository } from "../repositories/todo.repository";
import { Todo } from "../ententies/todo.entity";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

export class TodoService {
  constructor(private repository: TodoRepository) {}

  async getAllTodos(): Promise<Todo[]> {
    return this.repository.findAll();
  }

  async createTodo(createDto: { title: string }): Promise<Todo> {
    const todo = plainToClass(Todo, createDto);
    const errors = await validate(todo);
    
    if (errors.length > 0) {
      const messages = errors.flatMap(error => 
        error.constraints ? Object.values(error.constraints) : []
      );
      throw new Error(`Validation failed: ${messages.join(', ')}`);
    }

    return this.repository.create(todo);
  }

  async updateTodoStatus(id: number, completed: boolean): Promise<Todo> {
    return this.repository.update(id, { completed });
  }

  async deleteTodo(id: number): Promise<void> {
    return this.repository.delete(id);
  }

  async clearCompletedTodos(): Promise<void> {
    return this.repository.clearCompleted();
  }

  async updateTodoTitle(id: number, newTitle: string): Promise<Todo> {
    if (!newTitle.trim()) {
      throw new Error('Title cannot be empty');
    }
  
    return this.repository.update(id, { title: newTitle.trim() });
  }
  
}