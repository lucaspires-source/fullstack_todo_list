import { Request, Response } from "express";
import { TodoService } from "../services/todo.services";
import { TodoRepository } from "../repositories/todo.repository";

// Helper type for error handling
type ErrorWithMessage = {
  message: string;
};

// Type guard to check if error has message
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

// Utility to handle unknown errors
function handleError(error: unknown): { message: string, statusCode: number } {
  if (isErrorWithMessage(error)) {
    return { 
      message: error.message,
      statusCode: error.message.includes('not found') ? 404 : 400
    };
  }
  return {
    message: 'An unexpected error occurred',
    statusCode: 500
  };
}

export class TodoController {
  private todoService = new TodoService(new TodoRepository());

  async getTodos(req: Request, res: Response) {
    try {
      const todos = await this.todoService.getAllTodos();
      const todosWithISODates = todos.map(todo => ({
        ...todo,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString()
      }));
      res.json(todosWithISODates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch todos" });
    }
  }

  async createTodo(req: Request, res: Response) {
    try {
      const todo = await this.todoService.createTodo(req.body);
      res.status(201).json(todo);
    } catch (error) {
      const { message, statusCode } = handleError(error);
      res.status(statusCode).json({ error: message });
    }
  }

  async updateTodo(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      
      const todo = await this.todoService.updateTodoStatus(id, req.body.completed);
      res.json(todo);
    } catch (error) {
      const { message, statusCode } = handleError(error);
      res.status(statusCode).json({ error: message });
    }
  }

  async deleteTodo(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      
      await this.todoService.deleteTodo(id);
      res.status(204).end();
    } catch (error) {
      const { message, statusCode } = handleError(error);
      res.status(statusCode).json({ error: message });
    }
  }

  async clearCompleted(req: Request, res: Response) {
    try {
      await this.todoService.clearCompletedTodos();
      res.status(204).end();
    } catch (error) {
      const { message, statusCode } = handleError(error);
      res.status(statusCode).json({ error: message });
    }
  }

  async updateTodoTitle(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { title } = req.body;
  
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
  
      if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'Invalid title' });
      }
  
      const todo = await this.todoService.updateTodoTitle(id, title);
      res.json(todo);
    } catch (error) {
      const { message, statusCode } = handleError(error);
      res.status(statusCode).json({ error: message });
    }
  }
  
}