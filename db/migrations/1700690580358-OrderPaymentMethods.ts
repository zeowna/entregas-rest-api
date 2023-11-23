import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderPaymentMethods1700690580358 implements MigrationInterface {
  name = 'OrderPaymentMethods1700690580358';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" ADD "payment_method" character varying NOT NULL`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "payment_method"`);
  }
}
