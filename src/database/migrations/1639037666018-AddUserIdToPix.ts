import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserIdToPix1639037666018 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('pixs',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,

        })
      );

      await queryRunner.createForeignKey('pixs',
      new TableForeignKey({
        name: 'PixUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('pixs', 'PixUser');
        await queryRunner.dropColumn('pixs', 'user_id');

    }

}
