import { CommentsService } from './../comments/comments.service';
import { CommentEntity } from './../comments/entities/comment.entity';
import { IdeaResolver } from './idea.resolver';
import { UserEntity } from './../users/entities/user.entity';
import { IdeaEntity } from './entities/idea.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { IdeasController } from './ideas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([IdeaEntity, UserEntity, CommentEntity])],
  controllers: [IdeasController],
  providers: [IdeasService, IdeaResolver, CommentsService],
})
export class IdeasModule {}
