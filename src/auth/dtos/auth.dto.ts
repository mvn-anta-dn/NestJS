import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Gender } from 'src/models/users/entities/user.entity';

export class AuthDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;

  @ApiProperty()
  gender: Gender;
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
