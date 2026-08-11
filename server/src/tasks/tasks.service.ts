import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Prisma } from '../../generated/prisma/index.js';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    const task = await this.prisma.task.create({
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

    await this.prisma.activity.create({
      data: { taskId: task.id, actorId: userId, type: 'TASK_CREATED' }
    });

    return task;
  }

  async findAll(params?: { search?: string; status?: string; projectId?: string }) {
    const where: Prisma.TaskWhereInput = {};
    
    if (params?.status) {
      where.status = params.status as any;
    }
    
    if (params?.projectId) {
      where.projectId = params.projectId;
    }
    
    if (params?.search) {
      where.OR = [
        { title: { contains: params.search, mode: 'insensitive' } },
        { description: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.task.findMany({
      where,
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
        Activity: { include: { User: true }, orderBy: { createdAt: 'desc' } },
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const subtasks = await this.prisma.task.findMany({
      where: { parentTaskId: id },
      include: {
        TaskMember: { include: { User: true } },
        TaskLabel: { include: { Label: true } },
      },
      orderBy: { createdAt: 'asc' },
    });

    return { ...task, subtasks };
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId?: string) {
    try {
      const oldTask = await this.prisma.task.findUnique({ where: { id } });
      const updated = await this.prisma.task.update({
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

      if (userId && oldTask) {
        if (oldTask.status !== updated.status) {
          await this.prisma.activity.create({
            data: { taskId: id, actorId: userId, type: 'STATUS_CHANGED', payload: { from: oldTask.status, to: updated.status } }
          });
        }
        if (oldTask.priority !== updated.priority) {
          await this.prisma.activity.create({
            data: { taskId: id, actorId: userId, type: 'PRIORITY_CHANGED', payload: { from: oldTask.priority, to: updated.priority } }
          });
        }
      }

      return updated;
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

  async addMember(taskId: string, userId: string) {
    const existing = await this.prisma.taskMember.findUnique({
      where: { taskId_userId: { taskId, userId } }
    });
    
    if (existing) return existing;

    return this.prisma.taskMember.create({
      data: { taskId, userId }
    });
  }

  async removeMember(taskId: string, userId: string) {
    const existing = await this.prisma.taskMember.findUnique({
      where: { taskId_userId: { taskId, userId } }
    });
    
    if (!existing) return { success: true };

    await this.prisma.taskMember.delete({
      where: { taskId_userId: { taskId, userId } }
    });
    
    return { success: true };
  }
}
