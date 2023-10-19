import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

// DB TEST - Use FAKER or Docker Test Env instead
const databaseTest = [
  { name: 'Test Todo 1', completed: true },
  { name: 'Test Todo 2', completed: false },
  { name: 'Test Todo 3', completed: true },
];

describe('TodosController', () => {
  let controller: TodosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(databaseTest),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                name: 'Test Todo Single',
                completed: true,
                id,
              }),
            ),
            create: jest
              .fn()
              .mockImplementation((todo: CreateTodoDto) =>
                Promise.resolve({ title: 'TODO TEST', completed: true }),
              ),
            update: jest
              .fn()
              .mockImplementation((todo: UpdateTodoDto) =>
                Promise.resolve({ id: 4, title: 'TODO TEST', completed: true }),
              ),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should get an array of todos', async () => {
      await expect(controller.findAll()).resolves.toEqual([
        {
          name: 'Test Todo 1',
          completed: true,
        },
        {
          name: 'Test Todo 2',
          completed: false,
        },
        {
          name: 'Test Todo 3',
          completed: true,
        },
      ]);
    });
  });
  describe('getById', () => {
    it('should get a single todo', async () => {
      await expect(controller.findOne('3')).resolves.toEqual({
        completed: true,
        id: 3,
        name: 'Test Todo Single',
      });
    });
  });
});
