import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProduct1614873304275 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "products",
				columns: [
					{
            name: "id",
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "quantity",
            type: "int"
          },
					{
            name: "price",
            type: "int"
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()"
          }
				]
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("products");
	}

}
