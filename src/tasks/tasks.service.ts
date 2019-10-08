import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  async getTaskById(id: number) {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto) {
    return this.taskRepository.createTask(createTaskDto);
  }
  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus) {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }
}
