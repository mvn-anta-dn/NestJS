import { AuthGuard } from './../../common/guards/auth.guard';
import { CommentRO } from './../comments/dtos/comment.dto';
import { CommentsService } from './../comments/comments.service';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class CommentResolver {
  constructor(private commentsService: CommentsService) {}

  @Query(() => CommentRO)
  async comment(@Args('id') id: string) {
    return await this.commentsService.show(id);
  }

  @Mutation(() => CommentRO)
  @UseGuards(new AuthGuard())
  async createComment(
    @Args('idea') ideaId: string,
    @Args('comment') comment: string,
    @Context('user') user,
  ) {
    const { id: userId } = user;
    const data = { comment };
    return await this.commentsService.create(ideaId, userId, data);
  }

  @Mutation(() => CommentRO)
  @UseGuards(new AuthGuard())
  async deleteComment(@Args('id') id: string, @Context('user') user) {
    const { id: userId } = user;
    return await this.commentsService.destroy(id, userId);
  }
}
