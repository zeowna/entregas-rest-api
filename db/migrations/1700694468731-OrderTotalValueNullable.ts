import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderTotalValueNullable1700694468731 implements MigrationInterface {
    name = 'OrderTotalValueNullable1700694468731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "total_value" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "total_value" SET NOT NULL`);
    }

}
