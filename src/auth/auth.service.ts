import { plainToClass } from 'class-transformer';
import { AuthDTO, AuthRO } from './dtos/auth.dto';
import { UserEntity } from './../models/users/entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async login(data: AuthDTO): Promise<AuthRO> {
    const { username, password } = data;
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return plainToClass(AuthRO, user, { excludeExtraneousValues: true });
  }

  async register(data: AuthDTO): Promise<AuthRO> {
    const { username } = data;
    let user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      throw new HttpException('User already existed', HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return plainToClass(AuthRO, user, { excludeExtraneousValues: true });
  }
}
