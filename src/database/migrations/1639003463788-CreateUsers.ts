import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1639003463788 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( 
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                      },
                      {
                        name: "firstName",
                        type: "varchar",
                      },
                      {
                        name: "lastName",
                        type: "varchar",
                      },
                      {
                        name: "accountNumber",
                        type: "numeric",
                      },
                      {
                        name: "accountDigit",
                        type: "numeric",
                      },
                      {
                        name: "wallet",
                        type: "numeric",
                      },
                      {
                        name: "email",
                        type: "varchar",
                      },
                      {
                        name: "password",
                        type: "varchar",
                      },
                ],
            })
            
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
