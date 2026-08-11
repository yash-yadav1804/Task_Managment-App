import { IsString, IsNotEmpty, IsOptional, IsIn, IsUUID, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @IsIn(['BACKLOG', 'TODO', 'DOING', 'COMPLETED', 'ON_HOLD'])
  status?: string;

  @IsString()
  @IsOptional()
  @IsIn(['NO_PRIORITY', 'LOW', 'MEDIUM', 'HIGH', 'URGENT'])
  priority?: string;

  @IsUUID()
  @IsNotEmpty()
  projectId: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;
}
