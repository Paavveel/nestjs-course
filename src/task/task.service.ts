import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  public tasks = [
    { id: 1, name: 'Task 1', isCompleted: false },
    { id: 2, name: 'Task 2', isCompleted: true },
  ];

  create(createTaskDto: CreateTaskDto) {
    const newTask = {
      id: this.tasks.length + 1,
      name: createTaskDto.name,
      description: createTaskDto.description,
      priority: createTaskDto.priority,
      tags: createTaskDto.tags,
      isCompleted: false,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  async findAll() {
    return await this.taskRepository.find();
  }

  findById(id: number) {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  update(id: number, updateTaskDto: Partial<UpdateTaskDto>) {
    const task = this.findById(id);

    Object.assign(task, updateTaskDto);

    return task;
  }

  remove(id: number) {
    const task = this.findById(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    this.tasks = this.tasks.filter((task) => task.id !== id);

    return task;
  }
}
