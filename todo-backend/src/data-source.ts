// backend/src/data-source.ts
import { DataSource } from "typeorm";
import { Todo } from "./ententies/todo.entity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite", // File-based database
  synchronize: true,
  logging: false,
  entities: [Todo],
  migrations: [],
  subscribers: [],
});