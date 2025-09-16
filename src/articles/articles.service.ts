import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateArticleDto) {
    return this.prisma.article.create({
      data: {
        author: dto.author,
        title: dto.title,
        content: dto.content,
      },
      select: {
        author: true,
        title: true,
        content: true,
      },
    });
  }

  async findAll() {
    return this.prisma.article.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const article = await this.prisma.article.findUnique({
      where: { id: id },
      select: {
        author: true,
        title: true,
        content: true,
        createdAt: true,
      },
    });
    if (!article) throw new NotFoundException(`Article ${id} not found`);
    return article;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
