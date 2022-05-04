import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/User';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [FeedbackService],
  controllers: [FeedbackController]
})
export class FeedbackModule {}
