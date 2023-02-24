import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';

@Entity({ name: 'todos' })
export class Todo extends BaseEntity {
  @ApiProperty({ description: 'Primary key', example: 1 })
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({ description: 'text', example: 'This is my first todo' })
  @Column()
  title: string;

  @ApiProperty({ description: 'Mark as completed' })
  @Column()
  completed: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
