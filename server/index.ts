import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import { UserModel } from './model';
import {db} from './database/knex'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.get('/api/v1', (req:Request, res:Response)=>{
	res.status(200).json({msg: 'typescript is working'})
});

app.get('/api/v1/users', (req:Request, res:Response)=>{
	try{
		db.column(['_id', '_created_at', '_modified_at', 'first_name', 'last_name', 'email', 'role'])
		.from('users')
		.whereNull('_deleted_at')
		.then((results) =>{ //need to make a user response object and map it here to a user object
			const data: Array<UserModel> = [];
			for(const user of results){
				data.push({
					_id: user._id,
					_created_at: user._created_at,
					firstName: user.first_name,
					lastName: user.last_name,
					email: user.email,
					role: user.role,
				})
			}
			
			return res.status(200).json({
				numberOfResults: results.length,
				accessedOn: new Date(),
				data: data
			})
		})
		.catch(e =>{
			return res.status(500).json({message: e})
		})
	}catch(e){
		return res.status(500).json({message: e})
	}
});

app.get('/api/v1/user/:id', (req:Request, res:Response)=>{
	const id = req.params.id;

	try{
		db.column(['_id', '_created_at', '_modified_at', 'first_name', 'last_name', 'email', 'role'])
		.from('users')
		.whereNull('_deleted_at')
		.andWhere('_id', '=', id)
		.then((results) =>{ //need to make a user response object and map it here to a user object
			const data: Array<UserModel> = [];
			for(const user of results){
				data.push({
					_id: user._id,
					_created_at: user._created_at,
					firstName: user.first_name,
					lastName: user.last_name,
					email: user.email,
					role: user.role,
				})
			}
			
			return res.status(200).json({
				numberOfResults: results.length,
				accessedOn: new Date(),
				data: data
			})
		})
		.catch(e =>{
			return res.status(500).json({message: e})
		})
	}catch(e){
		return res.status(500).json({message: e})
	}
});


app.get('/api/v1/events', (req:Request, res:Response)=>{
	const event = {
		_id: 1,
		_created_date: '2023/01/01',
		fk_user__id: 1,
		title: 'take out the trash',
		start: '2023/12/03T00:00:00',
		end: '2023/12/03T00:00:00',
		description: 'I need to make sure I do this before the wife gets home',
	}

	return res.status(200).json({data:[event]})
})

app.listen(port, ()=>{
	console.log(`Server is listening on port: ${port}`)
})

/**
 * models needed
 * 1) users
 * --firstname, lastname, email, any other info needed.  but using google auth so may not need much
 * 
 * 2) events
 * -- this is the calendar events.  
 * -- _id, _created_at, _created_by, modified, deleted, fk_user__id, start, end, title
 * 
 * 3) notes
 * --this will act as the description for the events for now, but will be expanded later easily
 * -- _id, created, modified, deleted, fk_user__id, text
 * 
 * 4) event_notes
 * -- link between events and notes
 * -- _id, created, modified, delted, fk_note__id, fk_event__id
 * 
 * 5) roles
 * -- this is a table that describes what roles are available
 * 
 * 6) permissions
 * -- descirbes what permissions are available
 * 
 * 7) user_roles
 * -- link between user and roles they are attached to
 * 
 * 8) role_permissions
 * --link between roles and what permissions they have access to
 * 
 * UserModel{
 * 	user: {first name, last name, email, etc...},
 * 	roles: [list of user roles assigned to the user]
 * 	selectedRole: the role currently assigned to the user - this and roles will most likely be the same thing
 * 	permissions? - this will likely need to be a separate query,  not one needed for the getusers endpoint
 * }
 */