import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';

// DB TEST - Use FAKER or Docker Test Env instead
const todoArray = [
  new Todo('Test Todo 1', false),
  new Todo('Test Todo 2', true),
  new Todo('Test Todo 3', true),
];

const oneTodo = new Todo('Test Todo Single', true);

describe('TodosService', () => {
  let service: TodosService;
  let repo: Repository<Todo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          // define all the methods that you use from the catRepo
          // give proper return values as expected or mock implementations, your choice
          useValue: {
            find: jest.fn().mockResolvedValue(todoArray),
            findOne: jest.fn().mockResolvedValue(oneTodo),
            create: jest.fn().mockReturnValue(oneTodo),
            save: jest.fn(),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            update: jest.fn().mockResolvedValue(true),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    repo = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
