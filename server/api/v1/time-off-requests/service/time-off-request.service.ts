import { Knex } from "knex";
import { AbstractService } from "../../../../service";
import { TimeOffRequestModel } from "../model/time-off-request.model";

export class TimeOffRequestService extends AbstractService{
	protected static _instance: TimeOffRequestService;

	private constructor(knex: Knex){
		super(knex)
	}
	
	public static getInstance(knex:Knex): TimeOffRequestService{
		if(TimeOffRequestService._instance == null){
			TimeOffRequestService._instance = new TimeOffRequestService(knex)
		}
		return TimeOffRequestService._instance
	}

	public async getTimeOffRequests(start?:string, end?:string, userId?:number): Promise<Array<TimeOffRequestModel>>{ //TODO: make a time off request model
		const query = this._knex
			.column(['r.fk_user__id', 'r._id', 'u.first_name', 'u.last_name', 'e.title', 'e.description', 'e.start', 'e.end', 'r.is_approved'])
			.from('time_off_requests AS r')
			.leftJoin('events AS e', 'e._id', 'r.fk_event__id')
			.leftJoin('users as u', 'u._id', 'r.fk_user__id')
			.whereNull('r._deleted_at')
			.whereNull('e._deleted_at')
			
			if(start != null){
				query.where('e.start', '>=', start) //TODO: use date format for start and end of day (may be able to do this in middle wear)
			}

			if(end != null){
				query.andWhere('e.end',  '<=', end)
			}

			if(userId != null){
				query.where('u._id', '=', userId)
			}
		
			return query.then((results) =>{ //need to make a user response object and map it here to a user object
				const requests: Array<any> = []; //need to make a time off request model
				
				for(const request of results){
					requests.push({
						_id: request._id,
						_created_at: request._created_at,
						_modified_at: request._modified_at,
						firstName: request.first_name,
						lastName: request.last_name,
						title: request.title,
						description: request.description,
						start:request.start,
						end: request.end,
						isApproved: request.is_approved
					})
				}

				return requests
			})
	}

	public async createTimeOffRequest(request: TimeOffRequestModel): Promise<number>{
		return this._knex('time_off_requests')
			.insert({fk_user__id: request.userId, fk_event__id: request.eventId, is_approved: request.isApproved})
			.then(result => result[0])
		
	}

	public async updateTimeOffRequest(request: TimeOffRequestModel): Promise<any>{

	}
}