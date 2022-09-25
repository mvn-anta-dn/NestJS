import { UserRO } from './../../users/dtos/user.dto';
import { IsString } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class IdeaDTO {
  @IsString()
  @ApiProperty()
  idea: string;

  @IsString()
  @ApiProperty()
  description: string;
}

@ObjectType()
export class IdeaRO {
  @Field()
  @Expose()
  id: string;

  @Field()
  @Expose()
  idea: string;

  @Field()
  @Expose()
  description: string;

  @Field((type) => UserRO)
  @Type(() => UserRO)
  @Expose()
  author: UserRO;

  @Field((type) => [UserRO])
  @Type(() => UserRO)
  @Expose()
  upVotes?: UserRO[];

  @Field((type) => [UserRO])
  @Type(() => UserRO)
  @Expose()
  downVotes?: UserRO[];
}
