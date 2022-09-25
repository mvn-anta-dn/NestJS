import { CommentsService } from './../comments/comments.service';
import { CommentEntity } from './../comments/entities/comment.entity';
import { UserResolver } from './user.resolver';
import { IdeaEntity } from './../ideas/entities/idea.entity';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, IdeaEntity, CommentEntity])],
  controllers: [UsersController],
  providers: [UsersService, UserResolver, CommentsService],
})
export class UsersModule {}
