import { UserRepository } from './users.repository';
import { UserRO } from './dtos/user.dto';
import { UserEntity } from './entities/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: UserRepository,
  ) {}
  private readonly logger = new Logger();

  async showAll(page = 1): Promise<UserRO[]> {
    const users = await this.userRepository.find({
      relations: ['ideas', 'bookmarks'],
      skip: 10 * (page - 1),
      take: 10,
    });
    return users.map((user) =>
      plainToClass(UserRO, user, { excludeExtraneousValues: true }),
    );
  }

  // @Cron('5 * * * * *')
  // handleCron() {
  //   this.logger.debug('Called when the current second is 45');
  // }
}
