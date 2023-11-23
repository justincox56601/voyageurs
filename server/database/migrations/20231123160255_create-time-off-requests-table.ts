import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('time_off_requests', (table)=>{
		table.increments('_id').primary();
		table.dateTime('_created_at').notNullable().defaultTo(knex.fn.now());
		table.dateTime('_modified_at').notNullable().defaultTo(knex.fn.now());
		table.dateTime('_deleted_at');
		table.integer('fk_user__id').notNullable().unsigned();
		table.integer('fk_event__id').notNullable().unsigned();
		table.tinyint('is_approved').notNullable().defaultTo(0);
		table.foreign('fk_user__id').references('users._id');
		table.foreign('fk_event__id').references('events._id');
	})
}


export async function down(knex: Knex): Promise<void> {
	knex.schema.dropTable('time_off_requests')
}

