import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("events").del();

    // Inserts seed entries
    await knex("events").insert([
        {fk_user__id: 1, title: 'Time Off Request', description: 'I want to take a day off', start: '2023-11-22 11:57:08', end: '2023-11-22 11:57:08'},
		{fk_user__id: 1, title: 'Time Off Request', description: 'Doctors Appointment', start: '2023-11-12 11:57:08', end: '2023-11-22 11:57:08'},
		{fk_user__id: 1, title: 'Time Off Request', description: 'Continuing Education', start: '2023-11-02 11:57:08', end: '2023-11-22 11:57:08'},
    ]);
};
