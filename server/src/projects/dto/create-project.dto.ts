import { IsString, IsNotEmpty, IsOptional, IsIn, IsDateString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @IsIn(['NO_PRIORITY', 'LOW', 'MEDIUM', 'HIGH', 'URGENT'])
  priority?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;
}
