import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1685821570853 implements MigrationInterface {
    name = 'Tables1685821570853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "cep" character varying NOT NULL, "street" character varying NOT NULL, "neighbourhood" character varying NOT NULL, "number" integer NOT NULL, "complement" character varying, "city" character varying NOT NULL, "state" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "birthday" TIMESTAMP NOT NULL, "cpf" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "profile_picture_uri" character varying, "type" character varying NOT NULL, "addresses_id" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "partner" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "cnpj" character varying NOT NULL, "picture_uri" character varying, "address_id" integer, CONSTRAINT "REL_c6ebaab1c8457d6393fc6578d3" UNIQUE ("address_id"), CONSTRAINT "PK_8f34ff11ddd5459eacbfacd48ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_product" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "quantity" integer NOT NULL, "value" integer NOT NULL, "customer_id" integer, "partner_id" integer, "order_id" integer, CONSTRAINT "PK_dccd1ec2d6f5644a69adf163bc1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "value" integer NOT NULL, "status" character varying NOT NULL DEFAULT 'created', "status_updated_at" TIMESTAMP, "external_service_id" character varying, "customer_id" integer, "partner_id" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_category" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "UQ_96152d453aaea425b5afde3ae9f" UNIQUE ("name"), CONSTRAINT "PK_0dce9bc93c2d2c399982d04bef1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "size" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'active', "picture_uri" character varying, "category_id" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "partner_product" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "value" integer NOT NULL, "status" character varying NOT NULL, "partner_id" integer, "product_id" integer, CONSTRAINT "PK_56e3badcf4f0a21e615866eb059" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_category_size" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "category_id" integer, CONSTRAINT "PK_9ec8c310c633669d8de29a898d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_8abbeb5e3239ff7877088ffc25b" FOREIGN KEY ("addresses_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "partner" ADD CONSTRAINT "FK_c6ebaab1c8457d6393fc6578d31" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_product" ADD CONSTRAINT "FK_66e7f58e2e832724075ea43f742" FOREIGN KEY ("customer_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_product" ADD CONSTRAINT "FK_7a85a79df62a703a30f3c42ce68" FOREIGN KEY ("partner_id") REFERENCES "partner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_product" ADD CONSTRAINT "FK_e7181309bc4b336ba0f98c16fe2" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_cd7812c96209c5bdd48a6b858b0" FOREIGN KEY ("customer_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_318d6f1beb332b3c337b2be2a65" FOREIGN KEY ("partner_id") REFERENCES "partner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1" FOREIGN KEY ("category_id") REFERENCES "product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "partner_product" ADD CONSTRAINT "FK_6a297695d34f4be4c07fe11dd0e" FOREIGN KEY ("partner_id") REFERENCES "partner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "partner_product" ADD CONSTRAINT "FK_104f664aad831e5586436db4398" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_category_size" ADD CONSTRAINT "FK_ce5663f4a2f3a1e6b8ecbe8788c" FOREIGN KEY ("category_id") REFERENCES "product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_category_size" DROP CONSTRAINT "FK_ce5663f4a2f3a1e6b8ecbe8788c"`);
        await queryRunner.query(`ALTER TABLE "partner_product" DROP CONSTRAINT "FK_104f664aad831e5586436db4398"`);
        await queryRunner.query(`ALTER TABLE "partner_product" DROP CONSTRAINT "FK_6a297695d34f4be4c07fe11dd0e"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_0dce9bc93c2d2c399982d04bef1"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_318d6f1beb332b3c337b2be2a65"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_cd7812c96209c5bdd48a6b858b0"`);
        await queryRunner.query(`ALTER TABLE "cart_product" DROP CONSTRAINT "FK_e7181309bc4b336ba0f98c16fe2"`);
        await queryRunner.query(`ALTER TABLE "cart_product" DROP CONSTRAINT "FK_7a85a79df62a703a30f3c42ce68"`);
        await queryRunner.query(`ALTER TABLE "cart_product" DROP CONSTRAINT "FK_66e7f58e2e832724075ea43f742"`);
        await queryRunner.query(`ALTER TABLE "partner" DROP CONSTRAINT "FK_c6ebaab1c8457d6393fc6578d31"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_8abbeb5e3239ff7877088ffc25b"`);
        await queryRunner.query(`DROP TABLE "product_category_size"`);
        await queryRunner.query(`DROP TABLE "partner_product"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "product_category"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "cart_product"`);
        await queryRunner.query(`DROP TABLE "partner"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
