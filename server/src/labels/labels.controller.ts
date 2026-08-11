import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { LabelsService } from './labels.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { AssignLabelDto } from './dto/assign-label.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('labels')
@UseGuards(JwtAuthGuard)
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Get()
  findAll() {
    return this.labelsService.findAll();
  }

  @Post()
  create(@Body() createLabelDto: CreateLabelDto) {
    return this.labelsService.create(createLabelDto);
  }

  @Post('task/:taskId')
  assignToTask(@Param('taskId') taskId: string, @Body() assignLabelDto: AssignLabelDto) {
    return this.labelsService.assignToTask(taskId, assignLabelDto.labelId);
  }

  @Delete('task/:taskId/:labelId')
  removeFromTask(@Param('taskId') taskId: string, @Param('labelId') labelId: string) {
    return this.labelsService.removeFromTask(taskId, labelId);
  }
}
