import { UserEntity } from './../../models/users/entities/user.entity';
import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';

define(UserEntity, () => {
  const user = new UserEntity();
  user.username = faker.internet.userName().toLowerCase();
  user.password = '123123';
  return user;
});
