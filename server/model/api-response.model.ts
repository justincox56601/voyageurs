import { ObjectResponseModel } from "./object-response.model";

export interface ApiResponseModel<TData extends ObjectResponseModel>{
		numberOfResults: number,
		accessedOn: Date,
		data: Array<TData>
}