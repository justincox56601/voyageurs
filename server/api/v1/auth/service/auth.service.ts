import { Knex } from "knex";
import { AbstractService } from "../../../../service";
import { VerifyCallback } from 'passport-google-oauth20';


export class AuthService extends AbstractService{
	protected static _instance: AuthService;

	private constructor(knex: Knex){
		super(knex)
	}

	public static getInstance(knex:Knex):AuthService{
		if(AuthService._instance == null){
			AuthService._instance = new AuthService(knex)
		}
		return AuthService._instance;
	}

	public serializeUser(user:any, done:VerifyCallback){ //this will be a user model or a google user model
		//decide what info about the users needs to be saved into the cookie
		//probably the _id, or the googleID, and the accesstoken
		return done(null, user)
	}

	public deserializeUser(user:any, done:VerifyCallback){
		//find user by id or something similar, then pass that user back
		return done(null, user)
	}
}