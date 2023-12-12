"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const knex_1 = require("../../../database/knex");
const time_off_request_service_1 = require("./service/time-off-request.service");
const time_off_request_controller_1 = require("./controller/time-off-request.controller");
const events_service_1 = require("../events/service/events.service");
const timeOffRouter = (0, express_1.Router)();
const timeOffRequestService = time_off_request_service_1.TimeOffRequestService.getInstance(knex_1.KnexService);
const eventService = events_service_1.EventsService.getInstance(knex_1.KnexService);
const timeOffRequestController = new time_off_request_controller_1.TimeOffRequestController(timeOffRequestService, eventService);
timeOffRouter.get('/', [
    (0, express_validator_1.query)('start').optional().trim().escape().isISO8601().toDate().withMessage('Invalid date format'),
    (0, express_validator_1.query)('end').optional().trim().escape().isISO8601().toDate().withMessage('Invalid date format')
], timeOffRequestController.getTimeOffRequests.bind(timeOffRequestController));
timeOffRouter.get('/user/:userId', [
    (0, express_validator_1.param)('userId').notEmpty().isInt().withMessage('UserId must be an integer'),
    (0, express_validator_1.query)('start').optional().trim().escape().isISO8601().toDate().withMessage('Invalid date format'),
    (0, express_validator_1.query)('end').optional().trim().escape().isISO8601().toDate().withMessage('Invalid date format')
], timeOffRequestController.getTimeOffRequestsByUserId.bind(timeOffRequestController));
timeOffRouter.post('/', [
    (0, express_validator_1.body)('userId').notEmpty().isInt().withMessage('UserId must be an integer'),
    (0, express_validator_1.body)('start').optional().trim().escape().isISO8601().toDate().withMessage('Invalid date format'),
    (0, express_validator_1.body)('end').optional().trim().escape().isISO8601().toDate().withMessage('Invalid date format'),
    (0, express_validator_1.body)('title').notEmpty().trim().escape().isString().isLength({ max: 255 }),
    (0, express_validator_1.body)('description').notEmpty().trim().escape().isString().isLength({ max: 255 }),
], timeOffRequestController.addTimeOffRequest.bind(timeOffRequestController));
exports.default = timeOffRouter;
