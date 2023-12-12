import express, {Express, Request, Response, Router, NextFunction} from 'express';
import usersRouter from './users/index';
import timeOffRouter from './time-off-requests/index';
import authRouter from './auth/index';

const isLoggedIn = (req:Request, res:Response, next:NextFunction) =>{
	if(req.isAuthenticated()){
		next();
	}else{
		return res.sendStatus(401)
	}
}


const addUserPermissions = (req:Request & any, res:Response, next:NextFunction) =>{
	// const tempUser = {
	// 	name: req.user?.displayName,
	// 	email: req.user?.emails[0].value,
	// 	photo: req.user?.photos[0].value,
	// 	permissions:[
	// 		'canCreateOwnTimeOffRequest',
	// 		'canEditOwnTimeOffRequest',
	// 		'canDeleteOwnTimeOffRequest',
	// 		'canViewOwnTimeOffRequest'
	// 	]
	// }
	// req.user = tempUser;
	next() 
}

const v1Router = Router();

v1Router.use('/auth', authRouter);

v1Router.use(isLoggedIn);
v1Router.use(addUserPermissions)

v1Router.use('/users', usersRouter);
v1Router.use('/time-off-requests', timeOffRouter);




export default v1Router;