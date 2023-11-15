import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const { ENV, PG_HOST, PG_PORT, PG_USER, PG_PASSWORD, PG_DATABASE } =
  process.env;

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: PG_HOST,
  port: Number.parseInt(PG_PORT),
  username: PG_USER,
  password: PG_PASSWORD,
  database: PG_DATABASE,
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
  namingStrategy: new SnakeNamingStrategy(),
  ssl: ENV === 'production' ? { rejectUnauthorized: false } : undefined,
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
