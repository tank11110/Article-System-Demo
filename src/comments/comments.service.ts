import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(articleId: number, dto: CreateCommentDto) {
    const article = await this.prisma.article.findUnique({
      where: { id: articleId },
      select: { id: true },
    });
    if (!article) throw new NotFoundException(`Article ${articleId} not found`);

    return this.prisma.comment.create({
      data: {
        articleId: articleId,
        author: dto.author,
        content: dto.content,
      },
      select: {
        author: true,
        content: true,
      }
    });
  }

  async findAllByArticleID(articleId: number) {
    const article = await this.prisma.article.findUnique({
      where: { id: articleId },
      select: { id: true },
    });
    if (!article) throw new NotFoundException(`Article ${articleId} not found`);

    return this.prisma.comment.findMany({
      where: { articleId: articleId},
      select: {
        id: true,
        author: true,
        content: true,
        createdAt: true,
      },
      orderBy: { id: 'desc' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
