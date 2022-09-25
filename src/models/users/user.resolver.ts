import { CommentRO } from './../comments/dtos/comment.dto';
import { CommentsService } from './../comments/comments.service';
import { UserRO } from './dtos/user.dto';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';

@Resolver((of) => UserRO)
export class UserResolver {
  constructor(
    private usersService: UsersService,
    private commentsService: CommentsService,
  ) {}

  @Query(() => [UserRO])
  async users(@Args('page') page: number) {
    return await this.usersService.showAll(page);
  }

  @ResolveField(() => [CommentRO])
  comments(@Parent() user) {
    const { id } = user;
    return this.commentsService.showByUser(id);
  }
}
