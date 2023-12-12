import { ObjectResponseModel} from "../../../../model";
import { UserModel } from "./user.model";

export type UserResponseModel = ObjectResponseModel & UserModel;