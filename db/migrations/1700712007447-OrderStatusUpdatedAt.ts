import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderStatusUpdatedAt1700712007447 implements MigrationInterface {
  name = 'OrderStatusUpdatedAt1700712007447';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" DROP COLUMN "status_updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD "status_updated_at" TIMESTAMP WITH TIME ZONE`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" DROP COLUMN "status_updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD "status_updated_at" TIMESTAMP`,
    );
  }
}
