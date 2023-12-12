import { ApiResponseModel } from "../model/api-response.model";
import { ObjectResponseModel } from "../model/object-response.model";

export class AbstractController{
	
	protected _addMetaData<TData extends ObjectResponseModel>(data: Array<TData>): ApiResponseModel<TData>{
		return{
			numberOfResults: data.length,
			accessedOn: new Date(),
			data: data
		}
	}
}