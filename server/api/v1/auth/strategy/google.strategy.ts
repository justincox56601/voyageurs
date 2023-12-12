import passport from 'passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import {Request} from 'express';
import { UsersService } from '../../users/service/users.service';
import { UserResponseModel } from '../../users/model/user-response.type';

export class GoogleStrategy{
	private _userService: UsersService;

	constructor(userService: UsersService){
		this._userService = userService;
	}

	public googleStrategy(): Strategy{
		return new Strategy({
			clientID: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			callbackURL:process.env.GOOGLE_CALLBACK_URL!,
			scope: ['email', 'profile', 'https://www.googleapis.com/auth/calendar'],
			passReqToCallback: true,
			state: true,
		  }, 
		  async (request:Request, accessToken: string, refreshToken: string, profile:Profile, done: VerifyCallback) => {
			try{
				//const user: UserResponseModel = (await this._userService.getUserByEmail((profile.emails??[])[0].value))[0]
				const user = { //TODO: remember to take this out after testing
					name: 'Tech',
					email: 'tech@voyageursschool.org',
					accessToken: accessToken,
					refreshToken: refreshToken,
					googleId: profile.id
				}
				
				
				return done(null, user) 
			}catch(e){
				return done(e as Error, undefined)
			}
			
		  }
		)
	}
	
}