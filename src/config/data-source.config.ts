import { environment } from './../common/constants/environment';
import { join } from 'path';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  replication: {
    master: {
      database: environment.database.database,
      username: environment.database.username,
      password: environment.database.password,
      port: +(environment.database.port || 0),
      host: environment.database.host,
    },
    slaves: [
      {
        database: environment.database.database,
        username: environment.database.username,
        password: environment.database.password,
        port: +(environment.database.port || 0),
        host: environment.database.host,
      },
    ],
  },
  entities: [join(__dirname, '..', '**', '**', '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '..', 'database', 'migrations', '*{.ts,.js}')],
  synchronize: false,
  logging: false,
});
