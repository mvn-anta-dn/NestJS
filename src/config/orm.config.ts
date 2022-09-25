import 'dotenv/config';
import { join } from 'path';

export default {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  entities: [join(__dirname, '..', '**', '**', '**', '*.entity.{ts,js}')],
  factories: [
    join(__dirname, '..', 'database', 'factories', '*.factory{.ts,.js}'),
  ],
  seeds: [join(__dirname, '..', 'database', 'seeders', '*{.ts,.js}')],
};
