import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderChangeValue1700694296752 implements MigrationInterface {
    name = 'OrderChangeValue1700694296752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "change_value" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "change_value"`);
    }

}
