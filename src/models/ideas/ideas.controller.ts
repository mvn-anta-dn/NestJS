import { IdeaDTO } from './dtos/idea.dto';
import { ValidationPipe } from './../../common/pipes/validation.pipe';
import { AuthGuard } from './../../common/guards/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { User } from 'src/common/decorators/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('ideas')
@Controller('api/ideas')
export class IdeasController {
  private logger = new Logger('IdeaController');
  constructor(private ideasService: IdeasService) {}

  private logData(options: any) {
    options.user && this.logger.log('USER ' + JSON.stringify(options.user));
    options.data && this.logger.log('DATA ' + JSON.stringify(options.data));
    options.id && this.logger.log('IDEA ' + JSON.stringify(options.id));
  }

  @Get()
  showAllIdea(@Query('page') page: number) {
    return this.ideasService.showAll(page);
  }

  @Get()
  showNewestIdea(@Query('page') page: number) {
    return this.ideasService.showAll(page, true);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createIdea(@User('id') user: string, @Body() data: IdeaDTO) {
    this.logData({ user, data });
    return this.ideasService.create(user, data);
  }

  @Get(':id')
  readIdea(@Param('id') id: string) {
    return this.ideasService.read(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  updateIdea(
    @Param('id') id: string,
    @User('id') user: string,
    @Body() data: Partial<IdeaDTO>,
  ) {
    this.logData({ id, user, data });
    return this.ideasService.update(id, user, data);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  destroyIdea(@Param('id') id: string, @User('id') user: string) {
    this.logData({ id, user });
    return this.ideasService.destroy(id, user);
  }

  @Post(':id/upvote')
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  upvoteIdea(@Param('id') id: string, @User('id') user: string) {
    this.logData({ id, user });
    return this.ideasService.upvote(id, user);
  }

  @Post(':id/downvote')
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  downvoteIdea(@Param('id') id: string, @User('id') user: string) {
    this.logData({ id, user });
    return this.ideasService.downvote(id, user);
  }

  @Post(':id/bookmark')
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  bookmarkIdea(@Param('id') id: string, @User('id') user: string) {
    this.logData({ id, user });
    return this.ideasService.bookmark(id, user);
  }

  @Delete(':id/bookmark')
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  unBookmarkIdea(@Param('id') id: string, @User('id') user: string) {
    this.logData({ id, user });
    return this.ideasService.unBookmark(id, user);
  }
}
