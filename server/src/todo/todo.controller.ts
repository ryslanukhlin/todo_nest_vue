import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodo() {
    return this.todoService.getTodos();
  }

  @Post()
  createTodo(@Body() todoDto: TodoDto) {
    return this.todoService.saveTodo(todoDto);
  }

  @Patch(':id')
  async updateTodo(@Param('id') id: number, @Body() todoDto: TodoDto) {
    return await this.todoService.updateTodo(id, todoDto);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number) {
    return this.todoService.deleteTodo(id);
  }
}
