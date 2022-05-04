import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './models/Post';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './models/User';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.prod', '.env.dev'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_SCHEMA,
      entities: [Posts, User],
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: '465',
        secure: true,
        ignoreTLS: true,
        auth: {
          user: process.env.GOOGLE_ID,
          pass: process.env.GOOGLE_PASSWORD,
        }
      },
    }),
    PostModule,
    UsersModule,
    AuthModule,
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
     {
       provide: APP_GUARD,
       useClass: AuthGuard,
     }
    ],
})
export class AppModule {}
