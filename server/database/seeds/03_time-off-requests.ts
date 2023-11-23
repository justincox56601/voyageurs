import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("time_off_requests").del();

    // Inserts seed entries
    await knex("time_off_requests").insert([
        { fk_user__id: 1, fk_event__id: 1, is_approved: false},
		{ fk_user__id: 1, fk_event__id: 2, is_approved: false},
		{ fk_user__id: 1, fk_event__id: 3, is_approved: false},
    ]);
};
