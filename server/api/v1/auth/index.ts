import express, {Request, Router} from 'express';
import {
	param,
	query,
	body
} from 'express-validator';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv'; 
import { AuthService } from './service';
import { KnexService } from '../../../database/knex'; 
import { AuthController} from './controller';
import { UsersService } from '../users/service/users.service';
import { GoogleStrategy } from './strategy/google.strategy';

dotenv.config();



const authService: AuthService = AuthService.getInstance(KnexService);
const userService: UsersService = UsersService.getInstance(KnexService);
const authController: AuthController = new AuthController(authService);
const googleStrategy: GoogleStrategy = new GoogleStrategy(userService);


passport.use(googleStrategy.googleStrategy()); 

passport.serializeUser((user, done)=>authService.serializeUser(user, done));
  
passport.deserializeUser((user, done)=>authService.deserializeUser(user, done));

const authRouter = Router(); 

authRouter.get('/google', passport.authenticate('google'), (req, res)=>{
	return res.status(200);
})



authRouter.get('/google/redirect',
	passport.authenticate('google', {
		successRedirect: '/api/v1/auth/google/success',
		failureRedirect: '/api/v1/auth/google/failure'
	}),
	(req, res)=>{ 
		return res.status(200);
	}
)


authRouter.get('/google/success', async (req, res)=>{ //these will end up becoming the home page after I have that built
	return res.status(200).json({mes:'hello'})
})

authRouter.get('/google/failure', (req, res)=>{//these will end up becoming the home page after I have that built
	res.send('something went wrong')
})

export default authRouter; 