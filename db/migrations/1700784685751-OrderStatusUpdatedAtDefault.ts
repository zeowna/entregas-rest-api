import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderStatusUpdatedAtDefault1700784685751
  implements MigrationInterface
{
  name = 'OrderStatusUpdatedAtDefault1700784685751';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ALTER COLUMN "status_updated_at" SET DEFAULT 'NOW()'`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" ALTER COLUMN "status_updated_at" DROP DEFAULT`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }
}
