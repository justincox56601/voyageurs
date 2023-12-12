import { Request, Response} from 'express';
import {
	validationResult,
	matchedData
} from 'express-validator'
import { TimeOffRequestService } from "../service/time-off-request.service";
import { EventsService } from '../../events/service/events.service';
import { AbstractController } from '../../../../controller';


export class TimeOffRequestController extends  AbstractController{
	private _timeOffRequestService: TimeOffRequestService;
	private _eventService: EventsService;

	constructor(
		timeOffRequestService:TimeOffRequestService,
		eventService: EventsService
		){
		super();
		this._timeOffRequestService = timeOffRequestService;
		this._eventService = eventService;
	}

	public async getTimeOffRequests(req:Request, res:Response){
		const errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.status(500).json({errors: errors.array()})
		}

		const {start, end} = matchedData(req)

		try {
			const data: Array<any> = await this._timeOffRequestService.getTimeOffRequests(start, end);
			return res.status(200).json(this._addMetaData<any>(data))
		} catch (e) {
			//todo.  store the error message in the database to be reviewed later. (error code, error message)
			return res.status(500).json({message: 'An unknown error has occurred.  Please try again later.'})
		}
	}

	public async getTimeOffRequestsByUserId(req:Request, res:Response){
		const errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.status(500).json({errors: errors.array()})
		}

		const {userId, start, end} = matchedData(req)

		try {
			const data: Array<any> = await this._timeOffRequestService.getTimeOffRequests(start, end, userId);
			return res.status(200).json(this._addMetaData<any>(data))
		} catch (e) {
			//todo.  store the error message in the database to be reviewed later. (error code, error message)
			return res.status(500).json({message: 'An unknown error has occurred.  Please try again later.'})
		}
	}

	public async addTimeOffRequest(req:Request, res:Response){
		const errors = validationResult(req);
		if(!errors.isEmpty()){
			return res.status(500).json({errors: errors.array()})
		}

		const {title, description, start, end, userId} = matchedData(req)

		try{
			const eventId: number = await this._eventService.createEvent({userId, title, description, start, end});
			const data: any  = await this._timeOffRequestService.createTimeOffRequest({userId, eventId})
			return res.status(201).json(this._addMetaData(data))
		}catch (e) {
			console.log(e)
			//todo.  store the error message in the database to be reviewed later. (error code, error message)
			return res.status(500).json({message: 'An unknown error has occurred.  Please try again later.'})
		}
	}
} 