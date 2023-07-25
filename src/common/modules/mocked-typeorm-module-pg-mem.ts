import { DynamicModule } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DataType, IMemoryDb, newDb } from 'pg-mem';
import { v4 } from 'uuid';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

export class MockedTypeORMModuleWithPgMem {
  private module: DynamicModule;
  private dataSource: DataSource;
  private db: IMemoryDb;

  private setupDb() {
    this.db = newDb({
      autoCreateForeignKeyIndices: true,
    });

    this.db.public.registerFunction({
      implementation: () => 'test',
      name: 'current_database',
    });

    this.db.registerExtension('uuid-ossp', (schema) => {
      schema.registerFunction({
        name: 'uuid_generate_v4',
        returns: DataType.uuid,
        implementation: v4,
        impure: true,
      });
    });

    this.db.public.registerFunction({
      name: 'version',
      implementation: () =>
        'PostgreSQL 14.2, compiled by Visual C++ build 1914, 64-bit',
    });
  }

  private async setupDataSource(
    db: IMemoryDb,
    dataSourceOptions: DataSourceOptions,
  ) {
    this.dataSource = await db.adapters.createTypeormDataSource(
      dataSourceOptions,
    );
    await this.dataSource.initialize();
    await this.dataSource.synchronize();

    return this.dataSource;
  }

  forRoot(dataSourceOptions: DataSourceOptions) {
    if (!this.module) {
      this.module = TypeOrmModule.forRootAsync({
        useFactory: () => ({
          type: 'postgres',
          migrationsRun: false,
        }),
        dataSourceFactory: async () => {
          this.setupDb();
          return this.setupDataSource(this.db, dataSourceOptions);
        },
      });
    }

    return this.module;
  }

  forFeature(
    entities?: EntityClassOrSchema[],
    dataSource?: DataSource | DataSourceOptions | string,
  ) {
    return TypeOrmModule.forFeature(entities, dataSource);
  }

  async disconnect() {
    delete this.db;
    await this.dataSource.destroy();
  }
}
