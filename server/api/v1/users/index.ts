import express, {Router} from 'express';
import {
	param,
	query,
	body
} from 'express-validator';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { KnexService } from '../../../database/knex';
import passport from 'passport';

//reomve this later after testing
import {authenticate} from '@google-cloud/local-auth';
import {google} from 'googleapis';

const usersRouter: Router = Router();
const usersService: UsersService = UsersService.getInstance(KnexService);
const usersController = new UsersController(usersService)

usersRouter.get('/', usersController.getUsers.bind(usersController));

usersRouter.get('/user/:userId', [
	param('userId').notEmpty().isInt().withMessage('UserId must be an integer'),
], usersController.getUsersById.bind(usersController));

usersRouter.get('/calendar',  async (req, res)=>{
	/**
	 * TODO
	 * From research is seems like I will not be able to use Passport Authentication
	 * for this and will need to check into a different mathod for getting 
	 * authenticated for google calendar
	 */
	const calendar = google.calendar({ 
		version: 'v3',
		
	})
	const list = await calendar.calendarList.list() 
	return res.status(200).json({list})
})

export default usersRouter;