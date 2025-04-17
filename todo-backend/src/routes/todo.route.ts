import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller'

export const todoRouter = Router();
const controller = new TodoController();

todoRouter
  .route('/')
  .get(controller.getTodos.bind(controller))
  .post(controller.createTodo.bind(controller));

todoRouter
  .route('/:id')
  .put(controller.updateTodo.bind(controller))
  .delete(controller.deleteTodo.bind(controller));


todoRouter.put('/:id/title', controller.updateTodoTitle.bind(controller));


todoRouter.delete('/clear-completed', controller.clearCompleted.bind(controller));