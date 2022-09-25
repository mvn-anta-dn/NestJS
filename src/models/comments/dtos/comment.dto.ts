import { IdeaRO } from './../../ideas/dtos/idea.dto';
import { UserRO } from './../../users/dtos/user.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDTO {
  @IsString()
  @ApiProperty()
  comment: string;
}

@ObjectType()
export class CommentRO {
  @Field()
  @Expose()
  id: string;

  @Field()
  @Expose()
  comment: string;

  @Field(() => UserRO)
  @Type(() => UserRO)
  @Expose()
  author: UserRO;

  @Field(() => UserRO)
  @Type(() => IdeaRO)
  @Expose()
  idea: IdeaRO;
}
