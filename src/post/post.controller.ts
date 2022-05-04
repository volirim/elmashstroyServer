import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { Get } from '@nestjs/common';
import { IUpdatePost, Posts } from 'src/models/Post';
import { Public } from 'src/shared/public';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    ) {}

  @Get()
  @Public()
  getAll(): Promise<Posts[]> {
    return this.postService.findAll();
  }

  @Post()
  savePost(@Body() post: Posts): Promise<Posts> {
    return this.postService.save(post);
  }

  @Delete()
  deletePost(id: number): Promise<void> {
    return this.postService.delete(id);
  }

  @Put()
  changePost(post: IUpdatePost): Promise<Posts> {
    return this.postService.update(post);
  }
}
