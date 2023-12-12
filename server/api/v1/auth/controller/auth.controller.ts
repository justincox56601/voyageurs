import { Request, Response} from 'express';
import {
	validationResult,
	matchedData
} from 'express-validator'
import { AbstractController } from "../../../../controller";
import { AuthService } from "../service";


export class AuthController extends AbstractController{
	private _authService: AuthService;

	constructor(authService:AuthService){
		super();
		this._authService = authService;
	}

	public login(req:Request, res:Response){
		
	}
}