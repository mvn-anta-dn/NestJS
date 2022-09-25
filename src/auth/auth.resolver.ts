import { AuthDTO, AuthRO } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { UserEntity } from './../models/users/entities/user.entity';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver((of) => UserEntity)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthRO)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user: AuthDTO = { username, password };
    return await this.authService.login(user);
  }

  @Mutation(() => AuthRO)
  async register(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user: AuthDTO = { username, password };
    return await this.authService.register(user);
  }
}
