import { UserRO } from './../users/dtos/user.dto';
import { plainToClass } from 'class-transformer';
import { UserRepository } from './../users/users.repository';
import { IdeaRepository } from './ideas.repository';
import { Votes } from './../../common/helpers/votes.enum';
import { IdeaRO, IdeaDTO } from './dtos/idea.dto';
import { UserEntity } from './../users/entities/user.entity';
import { IdeaEntity } from './entities/idea.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IdeasService {
  constructor(
    @InjectRepository(IdeaEntity)
    private ideaRepository: IdeaRepository,
    @InjectRepository(UserEntity)
    private userRepository: UserRepository,
  ) {}

  // private toResponseObject(idea: IdeaEntity): IdeaRO {
  //   const responseObject: any = {
  //     ...idea,
  //     author: idea.author.toResponseObject(false),
  //   };
  //   if (responseObject.upVotes) {
  //     responseObject.upVotes = idea.upVotes.length;
  //   }
  //   if (responseObject.downVotes) {
  //     responseObject.downVotes = idea.downVotes.length;
  //   }
  //   return responseObject;
  // }

  private ensureOwnerShip(idea: IdeaEntity, userId: string) {
    if (idea.author.id !== userId) {
      throw new HttpException('Incorrect user', HttpStatus.UNAUTHORIZED);
    }
  }

  private async vote(idea: IdeaEntity, user: UserEntity, vote: Votes) {
    const opposite = vote === Votes.UP ? Votes.DOWN : Votes.UP;

    if (
      idea[opposite].filter((voter) => voter.id === user.id).length > 0 ||
      idea[vote].filter((voter) => voter.id === user.id).length > 0
    ) {
      idea[opposite] = idea[opposite].filter((voter) => voter.id !== user.id);
      idea[vote] = idea[vote].filter((voter) => voter.id !== user.id);
      await this.ideaRepository.save(idea);
    } else if (idea[vote].filter((voter) => voter.id !== user.id).length < 1) {
      idea[vote].push(user);
      await this.ideaRepository.save(idea);
    } else {
      throw new HttpException('Unable to catch vote', HttpStatus.BAD_REQUEST);
    }

    return idea;
  }

  async showAll(page = 1, newest?: boolean): Promise<IdeaRO[]> {
    const ideas = await this.ideaRepository.find({
      relations: ['author', 'upVotes', 'downVotes', 'comments'],
      take: 10,
      skip: 10 * (page - 1),
      order: newest && { created: 'DESC' },
    });

    return ideas.map((idea) =>
      plainToClass(IdeaRO, idea, { excludeExtraneousValues: true }),
    );
    // return ideas.map((idea) => this.toResponseObject(idea));
  }

  async create(userId: string, data: IdeaDTO): Promise<IdeaRO> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const idea = await this.ideaRepository.create({ ...data, author: user });
    await this.ideaRepository.save(idea);
    return plainToClass(IdeaRO, idea, { excludeExtraneousValues: true });
    // return this.toResponseObject(idea);
  }

  async read(id: string): Promise<IdeaRO> {
    const idea = await this.ideaRepository.findOne({
      where: {
        id,
      },
      relations: ['author', 'upVotes', 'downVotes', 'comments'],
    });

    if (!idea) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return plainToClass(IdeaRO, idea, { excludeExtraneousValues: true });
  }

  async update(
    id: string,
    userId: string,
    data: Partial<IdeaDTO>,
  ): Promise<IdeaRO> {
    let idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!idea) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnerShip(idea, userId);
    await this.ideaRepository.update({ id }, data);
    idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author', 'comments'],
    });
    return plainToClass(IdeaRO, idea, { excludeExtraneousValues: true });
  }

  async destroy(id: string, userId: string) {
    const idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author', 'comments'],
    });
    if (!idea) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnerShip(idea, userId);
    await this.ideaRepository.delete({ id });
    return plainToClass(IdeaRO, idea, { excludeExtraneousValues: true });
  }

  async upvote(id: string, userId: string) {
    let idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author', 'upVotes', 'downVotes', 'comments'],
    });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    idea = await this.vote(idea, user, Votes.UP);
    return plainToClass(IdeaRO, idea, { excludeExtraneousValues: true });
  }

  async downvote(id: string, userId: string) {
    let idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author', 'upVotes', 'downVotes', 'comments'],
    });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    idea = await this.vote(idea, user, Votes.DOWN);
    return plainToClass(IdeaRO, idea, { excludeExtraneousValues: true });
  }

  async bookmark(id: string, userId: string) {
    const idea = await this.ideaRepository.findOne({ where: { id } });
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['bookmarks'],
    });

    if (
      user.bookmarks.filter((bookmark) => bookmark.id === idea.id).length < 1
    ) {
      user.bookmarks.push(idea);
      await this.userRepository.save(user);
    } else {
      throw new HttpException(
        'Idea already bookmarked',
        HttpStatus.BAD_REQUEST,
      );
    }

    return plainToClass(UserRO, user, { excludeExtraneousValues: true });
  }

  async unBookmark(id: string, userId: string) {
    const idea = await this.ideaRepository.findOne({ where: { id } });
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['bookmarks'],
    });

    if (
      user.bookmarks.filter((bookmark) => bookmark.id === idea.id).length > 0
    ) {
      user.bookmarks = user.bookmarks.filter(
        (bookmark) => bookmark.id !== idea.id,
      );
      await this.userRepository.save(user);
    } else {
      throw new HttpException(
        'Idea already bookmarked',
        HttpStatus.BAD_REQUEST,
      );
    }

    return plainToClass(UserRO, user, { excludeExtraneousValues: true });
  }
}
