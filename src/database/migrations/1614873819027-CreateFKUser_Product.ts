import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateFKUserProduct1614873819027 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "FKproduct_user",
				columns: [
					{
						name: "id",
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
					},
					{
						name: "product_id",
						type: "uuid"
					},
					{
						name: "user_id",
						type: "uuid",
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
				],
				foreignKeys: [
					{
						name: "FKproduct_id",
						referencedTableName: "products",
						referencedColumnNames: ["id"],
						columnNames: ["product_id"],
						onDelete: "CASCADE",
						onUpdate: "CASCADE"
					},
					{
						name: "FKuser_id",
						referencedTableName: "users",
						referencedColumnNames: ["id"],
						columnNames: ["user_id"],
						onDelete: "CASCADE",
						onUpdate: "CASCADE"
					}
				]
			})
		);
		
	}

	public async down(queryRunner: QueryRunner): Promise<void> {

	}

}
