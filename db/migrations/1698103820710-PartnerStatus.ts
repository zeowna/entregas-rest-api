import { MigrationInterface, QueryRunner } from 'typeorm';

export class PartnerStatus1698103820710 implements MigrationInterface {
  name = 'PartnerStatus1698103820710';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "partner" ADD "status" character varying NOT NULL DEFAULT 'active'`,
    );
    await queryRunner.query(
      `ALTER TABLE "partner_product" ADD "in_stock_quantity" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "type" SET NOT NULL`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "type" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "partner_product" DROP COLUMN "in_stock_quantity"`,
    );
    await queryRunner.query(`ALTER TABLE "partner" DROP COLUMN "status"`);
  }
}
