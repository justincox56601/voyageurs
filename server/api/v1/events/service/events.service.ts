import { Knex } from "knex";
import { AbstractService } from "../../../../service";
import { EventModel } from "../model/event.model";


export class EventsService extends AbstractService{

	protected static _instance: EventsService;

	private constructor(knex:Knex){
		super(knex)
	}

	public static getInstance(knex: Knex): EventsService{
		if(EventsService._instance == null){
			EventsService._instance = new EventsService(knex);
		}
		return EventsService._instance;
	}

	public getEvents(){}

	public getEventById(eventId:number){}

	public async createEvent(event: EventModel):Promise<number>{
		return this._knex('events')
		.insert({
			fk_user__id: event.userId,
			title: event.title,
			description: event.description,
			start: event.start,
			end: event.end
		})
		.then(result => result[0])
	}

	public editEvent(eventId:number, event:EventModel){}

	public deleteEvent(eventId:number){}

}
