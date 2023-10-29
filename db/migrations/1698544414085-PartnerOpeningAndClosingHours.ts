import { MigrationInterface, QueryRunner } from 'typeorm';

export class PartnerOpeningAndClosingHours1698544414085
  implements MigrationInterface
{
  name = 'PartnerOpeningAndClosingHours1698544414085';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "partner" ADD "opening_hour" character varying NOT NULL DEFAULT '07:00'`,
    );
    await queryRunner.query(
      `ALTER TABLE "partner" ADD "closing_hour" character varying NOT NULL DEFAULT '21:00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "partner" DROP COLUMN "closing_hour"`);
    await queryRunner.query(`ALTER TABLE "partner" DROP COLUMN "opening_hour"`);
  }
}
