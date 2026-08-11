import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLabelDto } from './dto/create-label.dto';

@Injectable()
export class LabelsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.label.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async create(createLabelDto: CreateLabelDto) {
    const existing = await this.prisma.label.findUnique({
      where: { name: createLabelDto.name },
    });

    if (existing) {
      throw new ConflictException('Label with this name already exists');
    }

    return this.prisma.label.create({
      data: createLabelDto,
    });
  }

  async assignToTask(taskId: string, labelId: string) {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });
    if (!task) throw new NotFoundException('Task not found');
    
    const label = await this.prisma.label.findUnique({ where: { id: labelId } });
    if (!label) throw new NotFoundException('Label not found');

    // UPSERT style relation
    const existingLink = await this.prisma.taskLabel.findUnique({
      where: {
        taskId_labelId: {
          taskId,
          labelId,
        }
      }
    });

    if (existingLink) {
      return existingLink; // Already assigned
    }

    return this.prisma.taskLabel.create({
      data: {
        taskId,
        labelId,
      },
      include: {
        Label: true,
      }
    });
  }

  async removeFromTask(taskId: string, labelId: string) {
    const existingLink = await this.prisma.taskLabel.findUnique({
      where: {
        taskId_labelId: {
          taskId,
          labelId,
        }
      }
    });

    if (!existingLink) {
      return { success: true }; // Already removed
    }

    await this.prisma.taskLabel.delete({
      where: {
        taskId_labelId: {
          taskId,
          labelId,
        }
      }
    });

    return { success: true };
  }
}
