import { CommentResolver } from './comment.resolver';
import { CommentEntity } from './entities/comment.entity';
import { UserEntity } from './../users/entities/user.entity';
import { IdeaEntity } from './../ideas/entities/idea.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([IdeaEntity, UserEntity, CommentEntity])],
  controllers: [CommentsController],
  providers: [CommentsService, CommentResolver],
})
export class CommentsModule {}
