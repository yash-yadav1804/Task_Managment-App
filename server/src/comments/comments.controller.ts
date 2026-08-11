import { Controller, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @CurrentUser() user: any) {
    return this.commentsService.create(createCommentDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.commentsService.remove(id, user.id);
  }
}
