import { MigrationInterface, QueryRunner } from "typeorm";

export class AddressCoordinates1699485003636 implements MigrationInterface {
    name = 'AddressCoordinates1699485003636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "lat" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "lng"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "lng" double precision NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "lng"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "lng" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "lat" integer NOT NULL DEFAULT '0'`);
    }

}
