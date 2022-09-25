import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}

@ObjectType()
export class AuthRO {
  @Field()
  @Expose()
  id: string;

  @Field()
  @Expose()
  username: string;

  @Field()
  @Expose()
  token?: string;
}
