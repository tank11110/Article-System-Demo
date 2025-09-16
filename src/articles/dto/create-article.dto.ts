import { IsString } from 'class-validator';

export class CreateArticleDto {
    @IsString()
    author: string;

    @IsString()
    title: string;

    @IsString()
    content: string;
}