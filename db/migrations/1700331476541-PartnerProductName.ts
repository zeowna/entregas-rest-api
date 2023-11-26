import { MigrationInterface, QueryRunner } from 'typeorm';

export class PartnerProductName1700331476541 implements MigrationInterface {
  name = 'PartnerProductName1700331476541';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "partner_product" ADD "name" character varying NOT NULL`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "partner_product" DROP COLUMN "name"`);
  }
}
