import { TaskStatus } from '../tasks.model';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn(TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE)
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
