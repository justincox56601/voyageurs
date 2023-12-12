"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const service_1 = require("../../../../service");
class EventsService extends service_1.AbstractService {
    constructor(knex) {
        super(knex);
    }
    static getInstance(knex) {
        if (EventsService._instance == null) {
            EventsService._instance = new EventsService(knex);
        }
        return EventsService._instance;
    }
    getEvents() { }
    getEventById(eventId) { }
    createEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._knex('events')
                .insert({
                fk_user__id: event.userId,
                title: event.title,
                description: event.description,
                start: event.start,
                end: event.end
            })
                .then(result => result[0]);
        });
    }
    editEvent(eventId, event) { }
    deleteEvent(eventId) { }
}
exports.EventsService = EventsService;
