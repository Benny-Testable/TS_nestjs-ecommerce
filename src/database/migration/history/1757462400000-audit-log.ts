import { MigrationInterface, QueryRunner } from 'typeorm';

export class AuditLog1757462400000 implements MigrationInterface {
  name = 'AuditLog1757462400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "audit_log" ("id" SERIAL NOT NULL, "userId" integer, "method" character varying(10) NOT NULL, "path" character varying(255) NOT NULL, "statusCode" integer NOT NULL, "durationMs" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_audit_log_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_audit_log_userId" ON "audit_log" ("userId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_audit_log_path" ON "audit_log" ("path")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_audit_log_createdAt" ON "audit_log" ("createdAt")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_audit_log_createdAt"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_audit_log_path"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_audit_log_userId"`);
    await queryRunner.query(`DROP TABLE "audit_log"`);
  }
}
