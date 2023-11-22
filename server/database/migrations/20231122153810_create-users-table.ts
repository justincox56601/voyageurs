import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('users', (table)=>{
		table.increments('_id');
		table.dateTime('_created_at').notNullable().defaultTo(knex.fn.now());
		table.dateTime('_modified_at').notNullable().defaultTo(knex.fn.now());
		table.dateTime('_deleted_at');
		table.string('first_name').notNullable();
		table.string('last_name').notNullable();
		table.string('email').notNullable().unique();
		table.string('role').notNullable();
	})
}


export async function down(knex: Knex): Promise<void> {
	knex.schema.dropTable('users')
}

