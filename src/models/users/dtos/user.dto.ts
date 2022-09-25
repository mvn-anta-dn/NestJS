import { CommentEntity } from './../../comments/entities/comment.entity';
import { CommentRO } from './../../comments/dtos/comment.dto';
import { IdeaRO } from './../../ideas/dtos/idea.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { IdeaEntity } from './../../ideas/entities/idea.entity';
import { Expose, Type } from 'class-transformer';

@ObjectType()
export class UserRO {
  @Field()
  @Expose()
  id: string;

  @Field()
  @Expose()
  username: string;

  @Field((type) => [IdeaRO])
  @Type(() => IdeaRO)
  @Expose()
  bookmarks?: IdeaEntity[];

  @Type(() => CommentRO)
  comments?: CommentEntity[];
}
