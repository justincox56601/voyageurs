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
exports.TimeOffRequestService = void 0;
const service_1 = require("../../../../service");
class TimeOffRequestService extends service_1.AbstractService {
    constructor(knex) {
        super(knex);
    }
    static getInstance(knex) {
        if (TimeOffRequestService._instance == null) {
            TimeOffRequestService._instance = new TimeOffRequestService(knex);
        }
        return TimeOffRequestService._instance;
    }
    getTimeOffRequests(start, end, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this._knex
                .column(['r.fk_user__id', 'r._id', 'u.first_name', 'u.last_name', 'e.title', 'e.description', 'e.start', 'e.end', 'r.is_approved'])
                .from('time_off_requests AS r')
                .leftJoin('events AS e', 'e._id', 'r.fk_event__id')
                .leftJoin('users as u', 'u._id', 'r.fk_user__id')
                .whereNull('r._deleted_at')
                .whereNull('e._deleted_at');
            if (start != null) {
                query.where('e.start', '>=', start); //TODO: use date format for start and end of day (may be able to do this in middle wear)
            }
            if (end != null) {
                query.andWhere('e.end', '<=', end);
            }
            if (userId != null) {
                query.where('u._id', '=', userId);
            }
            return query.then((results) => {
                const requests = []; //need to make a time off request model
                for (const request of results) {
                    requests.push({
                        _id: request._id,
                        _created_at: request._created_at,
                        _modified_at: request._modified_at,
                        firstName: request.first_name,
                        lastName: request.last_name,
                        title: request.title,
                        description: request.description,
                        start: request.start,
                        end: request.end,
                        isApproved: request.is_approved
                    });
                }
                return requests;
            });
        });
    }
    createTimeOffRequest(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._knex('time_off_requests')
                .insert({ fk_user__id: request.userId, fk_event__id: request.eventId, is_approved: request.isApproved })
                .then(result => result[0]);
        });
    }
    updateTimeOffRequest(request) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.TimeOffRequestService = TimeOffRequestService;
