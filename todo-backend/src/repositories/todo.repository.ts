import { AppDataSource } from "../data-source";
import { Todo } from "../ententies/todo.entity";
import { QueryFailedError } from "typeorm";

export class TodoRepository {
  private repository = AppDataSource.getRepository(Todo);

  async findAll(): Promise<Todo[]> {
    return this.repository.find({
      order: { createdAt: "DESC" }
    });
  }

  async findById(id: number): Promise<Todo | null> {
    return this.repository.findOneBy({ id });
  }

  async create(todoData: Partial<Todo>): Promise<Todo> {
    const todo = this.repository.create(todoData);
    return this.repository.save(todo);
  }

  async update(id: number, updates: Partial<Todo>): Promise<Todo> {
    await this.repository.update(id, updates);
    const updatedTodo = await this.findById(id);
    if (!updatedTodo) throw new Error("Todo not found after update");
    return updatedTodo;
  }

  async delete(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new Error("Todo not found");
    }
  }

  async clearCompleted(): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .where("completed = :completed", { completed: true })
      .execute();
  }
}