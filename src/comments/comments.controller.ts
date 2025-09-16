import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('articles/:id/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(
    @Param('id', ParseIntPipe) articleId: number,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentsService.create(articleId, dto);
  }

  @Get()
  async findAll(
    @Param('id', ParseIntPipe) articleId: number,
  ) {
    const comments = await this.commentsService.findAllByArticleID(articleId);

    return {
      comments: comments.map(a => ({
        id: a.id,
        author: a.author,
        content: a.content,
        createdAt: a.createdAt,
        })),
      };
    }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
