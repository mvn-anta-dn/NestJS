import { CommentEntity } from './../../models/comments/entities/comment.entity';
import { faker } from '@faker-js/faker';
import { IdeaEntity } from './../../models/ideas/entities/idea.entity';
import { UserEntity } from './../../models/users/entities/user.entity';
import { Factory, Seeder } from 'typeorm-seeding';

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    const users = await factory(UserEntity)().createMany(10);

    const comments = await factory(CommentEntity)()
      .map(async (comment) => {
        comment.author = faker.helpers.arrayElement(users);
        return comment;
      })
      .createMany(100);

    const ideas = await factory(IdeaEntity)()
      .map(async (idea) => {
        idea.author = faker.helpers.arrayElement(users);
        idea.upVotes = faker.helpers.arrayElements(
          users,
          faker.datatype.number({ min: 2, max: 5 }),
        );
        idea.downVotes = faker.helpers.arrayElements(
          users,
          faker.datatype.number({ min: 2, max: 5 }),
        );
        idea.comments = faker.helpers.arrayElements(
          comments,
          faker.datatype.number({ min: 2, max: 5 }),
        );
        return idea;
      })
      .createMany(100);
  }
}
