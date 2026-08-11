import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Prisma } from '../../generated/prisma/index.js';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        reporterId: userId,
        status: (createTaskDto.status as any) || 'TODO',
        priority: (createTaskDto.priority as any) || 'NO_PRIORITY',
        TaskMember: {
          create: [{ userId }], // Assign creator as a member by default
        },
      },
      include: {
        TaskMember: { include: { User: true } },
        TaskLabel: { include: { Label: true } },
      },
    });
  }

  async findAll() {
    return this.prisma.task.findMany({
      include: {
        TaskMember: { include: { User: true } },
        TaskLabel: { include: { Label: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        TaskMember: { include: { User: true } },
        TaskLabel: { include: { Label: true } },
        Comment: { include: { User: true }, orderBy: { createdAt: 'desc' } },
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      return await this.prisma.task.update({
        where: { id },
        data: {
          ...updateTaskDto,
          status: updateTaskDto.status as any,
          priority: updateTaskDto.priority as any,
        },
        include: {
          TaskMember: { include: { User: true } },
          TaskLabel: { include: { Label: true } },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.task.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      throw error;
    }
  }
}
