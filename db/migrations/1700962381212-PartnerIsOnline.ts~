import { MigrationInterface, QueryRunner } from "typeorm";

export class PartnerIsOnline1700962381212 implements MigrationInterface {
    name = 'PartnerIsOnline1700962381212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "partner" ADD "is_online" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "partner" DROP COLUMN "is_online"`);
    }

}
