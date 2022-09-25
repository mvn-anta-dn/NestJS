import { IdeaEntity } from './entities/idea.entity';
import { Repository } from 'typeorm';
import dataSourceConfig from 'src/config/data-source.config';

export class IdeaRepository extends Repository<IdeaEntity> {
  constructor() {
    super(IdeaEntity, dataSourceConfig.manager);
  }
}
