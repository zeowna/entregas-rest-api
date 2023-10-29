import { MigrationInterface, QueryRunner } from 'typeorm';

export class PartnerOpeningAndClosingHours1698544952702
  implements MigrationInterface
{
  name = 'PartnerOpeningAndClosingHours1698544952702';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "partner" DROP COLUMN "opening_hour"`);
    await queryRunner.query(`ALTER TABLE "partner" DROP COLUMN "closing_hour"`);
    await queryRunner.query(
      `ALTER TABLE "partner" ADD "opening_hours" character varying NOT NULL DEFAULT '07:00'`,
    );
    await queryRunner.query(
      `ALTER TABLE "partner" ADD "closing_hours" character varying NOT NULL DEFAULT '21:00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "partner" DROP COLUMN "closing_hours"`,
    );
    await queryRunner.query(
      `ALTER TABLE "partner" DROP COLUMN "opening_hours"`,
    );
    await queryRunner.query(
      `ALTER TABLE "partner" ADD "closing_hour" character varying NOT NULL DEFAULT '21:00'`,
    );
    await queryRunner.query(
      `ALTER TABLE "partner" ADD "opening_hour" character varying NOT NULL DEFAULT '07:00'`,
    );
  }
}
