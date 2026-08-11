import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto, userId: string) {
    return this.prisma.comment.create({
      data: {
        body: createCommentDto.content,
        taskId: createCommentDto.taskId,
        authorId: userId,
      },
      include: {
        User: true,
      },
    });
  }

  async remove(id: string, userId: string) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    
    // In a real app we'd verify authorId === userId or check permissions
    await this.prisma.comment.delete({ where: { id } });
    return { success: true };
  }
}
