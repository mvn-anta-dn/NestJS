import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import dataSourceConfig from 'src/config/data-source.config';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceConfig.options)],
  controllers: [],
  providers: [],
})
export class PostgresModule {}
