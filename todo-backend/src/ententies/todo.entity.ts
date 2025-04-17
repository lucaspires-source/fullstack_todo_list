import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn 
  } from "typeorm";
  import { IsNotEmpty, IsBoolean } from "class-validator";
  
  @Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty({ message: "Title cannot be empty" })
  title!: string;

  @Column()
  @IsBoolean()
  completed: boolean = false;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(title?: string) {
    if (title) this.title = title;
  }
}