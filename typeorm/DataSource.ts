import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({
  path: process.env.ENV === 'test' ? '.env.test' : '.env',
});

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  migrations: [`${__dirname}/migration/**/*.ts`],
});
