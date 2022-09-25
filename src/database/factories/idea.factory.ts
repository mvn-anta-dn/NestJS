import { IdeaEntity } from './../../models/ideas/entities/idea.entity';
import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';

define(IdeaEntity, () => {
  const idea = new IdeaEntity();
  idea.idea = faker.company.bs();
  idea.description = faker.commerce.productDescription();
  return idea;
});
