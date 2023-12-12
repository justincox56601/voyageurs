import { Knex } from "knex";

export class AbstractService{
	protected _knex: Knex;

	constructor(knex: Knex){
		this._knex = knex;
	}

	
}
