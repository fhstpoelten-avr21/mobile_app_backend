import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Todo } from './todo.entity';

@ApiTags('Todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created todo',
    type: Todo,
  })
  async create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Todo> {
    return this.todosService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
