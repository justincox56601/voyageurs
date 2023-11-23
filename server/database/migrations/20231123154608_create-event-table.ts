import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('events', (table)=>{
		table.increments('_id').primary();
		table.dateTime('_created_at').notNullable().defaultTo(knex.fn.now());
		table.dateTime('_modified_at').notNullable().defaultTo(knex.fn.now());
		table.dateTime('_deleted_at');
		table.integer('fk_user__id').notNullable().unsigned();
		table.string('title').notNullable();
		table.string('description');
		table.dateTime('start').notNullable();
		table.dateTime('end').notNullable();
		table.foreign('fk_user__id').references('users._id');
	})
}


export async function down(knex: Knex): Promise<void> {
	knex.schema.dropTable('events')
}

