import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrate1663125183685 implements MigrationInterface {
  name = 'migrate1663125183685';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" text NOT NULL, "password" text NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "idea" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "idea" text NOT NULL, "description" text NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "authorId" uuid, CONSTRAINT "PK_5096f543c484b349f5234da9d97" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" text NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "authorId" uuid, "ideaId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_bookmarks_idea" ("userId" uuid NOT NULL, "ideaId" uuid NOT NULL, CONSTRAINT "PK_e0ae74f2721d64a3afa6917d2e6" PRIMARY KEY ("userId", "ideaId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_57a5c456ea2f8aa6b74dc8eb23" ON "user_bookmarks_idea" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_99eeae9c25ea8532138978937c" ON "user_bookmarks_idea" ("ideaId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "idea_up_votes_user" ("ideaId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_401574033acd10d101547e014ac" PRIMARY KEY ("ideaId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2eb6a98f4009fda03bd2b25bf0" ON "idea_up_votes_user" ("ideaId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_70080e60c5817e52304ea4034c" ON "idea_up_votes_user" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "idea_down_votes_user" ("ideaId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_605dbd3c8cbf447463944b768b6" PRIMARY KEY ("ideaId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cd3c6bd2b437eb73660f5027f6" ON "idea_down_votes_user" ("ideaId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_32d514b3760177a1b488084675" ON "idea_down_votes_user" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "idea" ADD CONSTRAINT "FK_67530863c810fc8fd60c3d59b4e" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_861b419cce1c9ae64295300d6b6" FOREIGN KEY ("ideaId") REFERENCES "idea"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_idea" ADD CONSTRAINT "FK_57a5c456ea2f8aa6b74dc8eb230" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_idea" ADD CONSTRAINT "FK_99eeae9c25ea8532138978937ce" FOREIGN KEY ("ideaId") REFERENCES "idea"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "idea_up_votes_user" ADD CONSTRAINT "FK_2eb6a98f4009fda03bd2b25bf01" FOREIGN KEY ("ideaId") REFERENCES "idea"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "idea_up_votes_user" ADD CONSTRAINT "FK_70080e60c5817e52304ea4034c9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "idea_down_votes_user" ADD CONSTRAINT "FK_cd3c6bd2b437eb73660f5027f6f" FOREIGN KEY ("ideaId") REFERENCES "idea"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "idea_down_votes_user" ADD CONSTRAINT "FK_32d514b3760177a1b4880846752" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "idea_down_votes_user" DROP CONSTRAINT "FK_32d514b3760177a1b4880846752"`,
    );
    await queryRunner.query(
      `ALTER TABLE "idea_down_votes_user" DROP CONSTRAINT "FK_cd3c6bd2b437eb73660f5027f6f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "idea_up_votes_user" DROP CONSTRAINT "FK_70080e60c5817e52304ea4034c9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "idea_up_votes_user" DROP CONSTRAINT "FK_2eb6a98f4009fda03bd2b25bf01"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_idea" DROP CONSTRAINT "FK_99eeae9c25ea8532138978937ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_bookmarks_idea" DROP CONSTRAINT "FK_57a5c456ea2f8aa6b74dc8eb230"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_861b419cce1c9ae64295300d6b6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "idea" DROP CONSTRAINT "FK_67530863c810fc8fd60c3d59b4e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_32d514b3760177a1b488084675"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cd3c6bd2b437eb73660f5027f6"`,
    );
    await queryRunner.query(`DROP TABLE "idea_down_votes_user"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_70080e60c5817e52304ea4034c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2eb6a98f4009fda03bd2b25bf0"`,
    );
    await queryRunner.query(`DROP TABLE "idea_up_votes_user"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_99eeae9c25ea8532138978937c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_57a5c456ea2f8aa6b74dc8eb23"`,
    );
    await queryRunner.query(`DROP TABLE "user_bookmarks_idea"`);
    await queryRunner.query(`DROP TABLE "comment"`);
    await queryRunner.query(`DROP TABLE "idea"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
