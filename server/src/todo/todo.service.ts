import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoDto } from './dto/todo.dto';
import { Todo } from './entity/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly userRepository: Repository<Todo>,
  ) {}

  getTodos() {
    return this.userRepository.find();
  }

  saveTodo(todo: TodoDto) {
    return this.userRepository.save(todo);
  }

  async updateTodo(id: number, todo: TodoDto) {
    this.userRepository.update(id, todo);
    return this.userRepository.findOne(id);
  }

  deleteTodo(id: number) {
    return this.userRepository.delete(id);
  }
}
