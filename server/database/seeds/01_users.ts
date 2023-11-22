import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { first_name: 'Jon', last_name: 'Souls', email: 'jonSouls@darksouls.net', role:'teacher' },
		{ first_name: 'Justin', last_name: 'Pand', email: 'jp@test.com', role:'admin' },
		{ first_name: 'Jenny', last_name: 'dadada', email: 'dadada@mail.com', role:'teacher' },
    ]);
};
