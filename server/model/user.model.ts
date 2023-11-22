import { 
	ObjectModel, 
	RoleModel 
} from "../model";


export interface UserModel extends ObjectModel{
	firstName: string;
	lastName: string;
	email?: string;
	role?: string;
}