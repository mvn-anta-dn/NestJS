import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
import dataSourceConfig from 'src/config/data-source.config';

export class CommentRepository extends Repository<CommentEntity> {
  constructor() {
    super(CommentEntity, dataSourceConfig.manager);
  }
  z;
}
