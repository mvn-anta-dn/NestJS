import { CommentEntity } from './../../models/comments/entities/comment.entity';
import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';

define(CommentEntity, () => {
  const comment = new CommentEntity();
  comment.comment = faker.commerce.productDescription();
  return comment;
});
