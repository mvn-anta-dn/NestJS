import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserEntity } from './../models/users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthRO } from './dtos/auth.dto';

@Resolver((of) => UserEntity)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthRO)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user: any = { username, password };
    return await this.authService.login(user);
  }

  @Mutation(() => AuthRO)
  async register(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user: any = { username, password };
    return await this.authService.register(user);
  }
}
