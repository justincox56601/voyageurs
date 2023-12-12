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
exports.TimeOffRequestController = void 0;
const express_validator_1 = require("express-validator");
const controller_1 = require("../../../../controller");
class TimeOffRequestController extends controller_1.AbstractController {
    constructor(timeOffRequestService, eventService) {
        super();
        this._timeOffRequestService = timeOffRequestService;
        this._eventService = eventService;
    }
    getTimeOffRequests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(500).json({ errors: errors.array() });
            }
            const { start, end } = (0, express_validator_1.matchedData)(req);
            try {
                const data = yield this._timeOffRequestService.getTimeOffRequests(start, end);
                return res.status(200).json(this._addMetaData(data));
            }
            catch (e) {
                //todo.  store the error message in the database to be reviewed later. (error code, error message)
                return res.status(500).json({ message: 'An unknown error has occurred.  Please try again later.' });
            }
        });
    }
    getTimeOffRequestsByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(500).json({ errors: errors.array() });
            }
            const { userId, start, end } = (0, express_validator_1.matchedData)(req);
            try {
                const data = yield this._timeOffRequestService.getTimeOffRequests(start, end, userId);
                return res.status(200).json(this._addMetaData(data));
            }
            catch (e) {
                //todo.  store the error message in the database to be reviewed later. (error code, error message)
                return res.status(500).json({ message: 'An unknown error has occurred.  Please try again later.' });
            }
        });
    }
    addTimeOffRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(500).json({ errors: errors.array() });
            }
            const { title, description, start, end, userId } = (0, express_validator_1.matchedData)(req);
            try {
                const eventId = yield this._eventService.createEvent({ userId, title, description, start, end });
                const data = yield this._timeOffRequestService.createTimeOffRequest({ userId, eventId });
                return res.status(201).json(this._addMetaData(data));
            }
            catch (e) {
                console.log(e);
                //todo.  store the error message in the database to be reviewed later. (error code, error message)
                return res.status(500).json({ message: 'An unknown error has occurred.  Please try again later.' });
            }
        });
    }
}
exports.TimeOffRequestController = TimeOffRequestController;
