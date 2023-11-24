import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderStatusUpdatedAtDefault1700784993481
  implements MigrationInterface
{
  name = 'OrderStatusUpdatedAtDefault1700784993481';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" ALTER COLUMN "status_updated_at" SET DEFAULT now()`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" ALTER COLUMN "status_updated_at" SET DEFAULT '2023-11-24 00:14:00.262611+00'`,
    );
  }
}
