import { EventModel } from "../../events/model/event.model";

export interface TimeOffRequestModel{
	userId:number;
	eventId:number;
	isApproved?: boolean
}