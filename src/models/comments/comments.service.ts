import { plainToClass } from 'class-transformer';
import { UserRepository } from './../users/users.repository';
import { IdeaRepository } from './../ideas/ideas.repository';
import { CommentDTO, CommentRO } from './dtos/comment.dto';
import { UserEntity } from './../users/entities/user.entity';
import { IdeaEntity } from './../ideas/entities/idea.entity';
import { CommentEntity } from './entities/comment.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from './comments.repository';
import { DataSource } from 'typeorm';
import { nextTick } from 'process';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: CommentRepository,
    @InjectRepository(IdeaEntity)
    private ideaRepository: IdeaRepository,
    @InjectRepository(UserEntity)
    private userRepository: UserRepository,
    private dataSource: DataSource,
  ) {}

  async showByIdea(id: string, page = 1) {
    const comments = await this.commentRepository.find({
      where: { idea: { id } },
      relations: ['author'],
      take: 10,
      skip: 10 * (page - 1),
    });

    return comments.map((comment) =>
      plainToClass(CommentRO, comment, { excludeExtraneousValues: true }),
    );
  }

  async showByUser(id: string, page = 1) {
    const comments = await this.commentRepository.find({
      where: { author: { id } },
      relations: ['author'],
      take: 10,
      skip: 10 * (page - 1),
    });

    return comments.map((comment) =>
      plainToClass(CommentRO, comment, { excludeExtraneousValues: true }),
    );
  }

  async show(id: string) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['author', 'idea'],
    });

    return plainToClass(CommentRO, comment, { excludeExtraneousValues: true });
  }

  async create(ideaId: string, userId: string, data: CommentDTO) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const idea = await queryRunner.manager
        .getRepository(IdeaEntity)
        .findOne({ where: { id: ideaId } });
      const user = await queryRunner.manager
        .getRepository(UserEntity)
        .findOne({ where: { id: userId } });

      const comment = await queryRunner.manager
        .getRepository(CommentEntity)
        .create({
          ...data,
          idea,
          author: user,
        });

      // test error
      // const comment2 = await queryRunner.manager
      //   .getRepository(CommentEntity)
      //   .create();
      await queryRunner.manager.save(comment);
      // await queryRunner.manager.save(comment2);

      await queryRunner.commitTransaction();

      return plainToClass(CommentRO, comment, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException('Create comment fail!', HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }

  async destroy(id: string, userId: string) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['author', 'idea'],
    });

    if (comment.author.id !== userId) {
      throw new HttpException(
        'You do not own this comment',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.commentRepository.remove(comment);
    return plainToClass(CommentRO, comment, { excludeExtraneousValues: true });
  }
}
