import { MigrationInterface, QueryRunner } from 'typeorm';

export class PartnerUserPartner1698279349035 implements MigrationInterface {
  name = 'PartnerUserPartner1698279349035';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "partner_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_b512a254641f366fb1de78a2a25" FOREIGN KEY ("partner_id") REFERENCES "partner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_b512a254641f366fb1de78a2a25"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "partner_id"`);
  }
}
