import { Knex } from "knex";
import { UserModel } from "../model/user.model";
import { AbstractService } from "../../../../service";
import { UserResponseModel } from "../model/user-response.type";

export class UsersService extends AbstractService{
	protected static _instance: UsersService;
	
	private constructor(knex: Knex){
		super(knex)
	}
	
	public static getInstance(knex: Knex): UsersService{
		if(UsersService._instance == null){
			UsersService._instance = new UsersService(knex)
		}

		return UsersService._instance
	}

	public async getUsers(): Promise<Array<UserResponseModel>>{
		return this._knex
		.column(['_id', '_created_at', '_modified_at', 'first_name', 'last_name', 'email', 'role'])
		.from('users')
		.whereNull('_deleted_at')
		.then((results) =>{
			const users: Array<UserResponseModel> = [];
			for(const user of results){
				users.push({
					_id: user._id,
					_created_at: user._created_at,
					firstName: user.first_name,
					lastName: user.last_name,
					email: user.email,
					role: user.role,
				})
			}

			return users
		})
		
	}

	public async getUsersById(id:number): Promise<Array<UserResponseModel>>{
		return this._knex
		.column(['_id', '_created_at', '_modified_at', 'first_name', 'last_name', 'email', 'role'])
		.from('users')
		.whereNull('_deleted_at')
		.where('_id', '=', id)
		.then((results) =>{ //need to make a user response object and map it here to a user object
			const users: Array<UserResponseModel> = [];
			for(const user of results){
				users.push({
					_id: user._id,
					_created_at: user._created_at,
					firstName: user.first_name,
					lastName: user.last_name,
					email: user.email,
					role: user.role,
				})
			}

			return users
		})
	}

	public async getUserByEmail(email:string): Promise<Array<UserResponseModel>>{
		return this._knex
		.column(['_id', '_created_at', '_modified_at', 'first_name', 'last_name', 'email', 'role'])
		.from('users')
		.whereNull('_deleted_at')
		.where('email', '=', email)
		.limit(1)
		.then((results) =>{ //need to make a user response object and map it here to a user object
			const users: Array<UserResponseModel> = [];
			for(const user of results){
				users.push({
					_id: user._id,
					_created_at: user._created_at,
					firstName: user.first_name,
					lastName: user.last_name,
					email: user.email,
					role: user.role,
				})
			}

			return users
		})
	}
}