import { CommentsService } from './../comments/comments.service';
import { CommentRO } from './../comments/dtos/comment.dto';
import { UserRO } from './../users/dtos/user.dto';
import { AuthGuard } from './../../common/guards/auth.guard';
import { IdeaRO } from './dtos/idea.dto';
import { IdeasService } from './ideas.service';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

@Resolver((of) => IdeaRO)
export class IdeaResolver {
  constructor(
    private ideasService: IdeasService,
    private commentsService: CommentsService,
  ) {}

  @Query(() => [IdeaRO])
  ideas(@Args('page') page: number, @Args('newest') newest?: boolean) {
    return this.ideasService.showAll(page, newest);
  }

  @Query(() => IdeaRO)
  async idea(@Args('id') id: string) {
    return await this.ideasService.read(id);
  }

  @Mutation(() => IdeaRO)
  @UseGuards(new AuthGuard())
  async createIdea(
    @Args('idea') idea: string,
    @Args('description') description: string,
    @Context('user') user,
  ) {
    const { id: userId } = user;
    const data = { idea, description };
    return await this.ideasService.create(userId, data);
  }

  @Mutation(() => IdeaRO)
  @UseGuards(new AuthGuard())
  async updateIdea(
    @Args('id') id: string,
    @Args('idea') idea: string,
    @Args('description') description: string,
    @Context('user') user,
  ) {
    const { id: userId } = user;
    const data: any = {};
    idea && (data.idea = idea);
    description && (data.description = description);
    return await this.ideasService.update(id, userId, data);
  }

  @Mutation(() => IdeaRO)
  @UseGuards(new AuthGuard())
  async deleteIdea(@Args('id') id: string, @Context('user') user) {
    const { id: userId } = user;
    return await this.ideasService.destroy(id, userId);
  }

  @Mutation(() => IdeaRO)
  @UseGuards(new AuthGuard())
  async upvote(@Args('id') id: string, @Context('user') user) {
    const { id: userId } = user;
    return await this.ideasService.upvote(id, userId);
  }

  @Mutation(() => IdeaRO)
  @UseGuards(new AuthGuard())
  async downvote(@Args('id') id: string, @Context('user') user) {
    const { id: userId } = user;
    return await this.ideasService.downvote(id, userId);
  }

  @Mutation(() => UserRO)
  @UseGuards(new AuthGuard())
  async bookmark(@Args('id') id: string, @Context('user') user) {
    const { id: userId } = user;
    return await this.ideasService.bookmark(id, userId);
  }

  @Mutation(() => UserRO)
  @UseGuards(new AuthGuard())
  async unbookmark(@Args('id') id: string, @Context('user') user) {
    const { id: userId } = user;
    return await this.ideasService.unBookmark(id, userId);
  }

  @ResolveField(() => [CommentRO])
  comments(@Parent() user) {
    const { id } = user;
    return this.commentsService.showByIdea(id);
  }
}
