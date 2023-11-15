import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddressCoordinates1699478005536 implements MigrationInterface {
  name = 'AddressCoordinates1699478005536';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" ADD "lat" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD "lng" integer NOT NULL DEFAULT '0'`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "lng"`);
    await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "lat"`);
  }
}
