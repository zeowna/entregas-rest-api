import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const { PG_HOST, PG_USER, PG_PASSWORD, PG_DATABASE } = process.env;

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: PG_HOST || 'db',
  port: 5432,
  username: PG_USER || 'postgres',
  password: PG_PASSWORD || 'root',
  database: PG_DATABASE || 'postgres',
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
  namingStrategy: new SnakeNamingStrategy(),
  ssl: PG_HOST ? { rejectUnauthorized: false } : undefined,
};

export const dataSourceTestOptions: DataSourceOptions = {
  ...dataSourceOptions,
  entities: ['src/**/*.entity.ts'],
  migrationsRun: false,
  migrationsTransactionMode: 'each',
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
