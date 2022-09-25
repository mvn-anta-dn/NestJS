import { UserRepository } from './users.repository';
import { UserRO } from './dtos/user.dto';
import { UserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: UserRepository,
  ) {}
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
}
