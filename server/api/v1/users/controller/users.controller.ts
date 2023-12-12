import { Request, Response} from 'express';
import {
	validationResult,
	matchedData
} from 'express-validator'
import { UsersService } from '../service/users.service';
import { UserResponseModel } from '../model/user-response.type';
import { AbstractController } from '../../../../controller';

export class UsersController extends AbstractController{

	private _usersService: UsersService; 

	constructor(usersService: UsersService){
		super();
		this._usersService = usersService;
	}

	public async getUsers(req:Request, res:Response){
		try{
			const data: Array<UserResponseModel> = await this._usersService.getUsers();
			console.log(req.user)
			return res.status(200).json(this._addMetaData<UserResponseModel>(data))
		}catch(e){
			//todo.  store the error message in the database to be reviewed later. (error code, error message)
			return res.status(500).json({message: 'An unknown error has occurred.  Please try again later.'})
		}
	}

	public async getUsersById(req:Request, res:Response){
		const errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.status(500).json({errors: errors.array()})
		}

		const {userId} = matchedData(req)
		try {
			const data: Array<UserResponseModel> = await this._usersService.getUsersById(userId);
			console.log(req.user)
			return res.status(200).json(this._addMetaData(data))
		} catch (e) {
			//todo.  store the error message in the database to be reviewed later. (error code, error message)
			return res.status(500).json({message: 'An unknown error has occurred.  Please try again later.'})
		}
	}
}

