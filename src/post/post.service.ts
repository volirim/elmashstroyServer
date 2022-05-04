import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUpdatePost, Posts as Posts } from 'src/models/Post';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>,
  ) {}

  findAll(): Promise<Posts[]> {
    return this.postsRepository.find();
  }

  save(post: IUpdatePost): Promise<Posts> {
      return this.postsRepository.save(post)
  }

  async update(post: IUpdatePost): Promise<Posts> {
    return await this.postsRepository.save(post);
  }

  async delete(id: number): Promise<void> {
    await this.postsRepository.delete(id);
  }
}
