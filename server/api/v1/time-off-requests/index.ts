import {Router} from 'express';
import {
	param,
	query,
	body,
	matchedData
} from 'express-validator';
import { KnexService } from '../../../database/knex';
import { TimeOffRequestService} from './service/time-off-request.service';
import { TimeOffRequestController } from './controller/time-off-request.controller';
import { EventsService } from '../events/service/events.service';

const timeOffRouter = Router();
const timeOffRequestService: TimeOffRequestService = TimeOffRequestService.getInstance(KnexService);
const eventService:EventsService = EventsService.getInstance(KnexService);
const timeOffRequestController: TimeOffRequestController = new TimeOffRequestController(timeOffRequestService, eventService)

timeOffRouter.get('/', [
	query('start').optional().trim().escape().isISO8601().toDate().withMessage('Invalid date format'),
	query('end').optional().trim().escape().isISO8601().toDate().withMessage('Invalid date format')
], timeOffRequestController.getTimeOffRequests.bind(timeOffRequestController));

timeOffRouter.get(
	'/user/:userId', 
	[
		param('userId').notEmpty().isInt().withMessage('UserId must be an integer'),
		query('start').optional().trim().escape().isISO8601().toDate().withMessage('Invalid date format'),
		query('end').optional().trim().escape().isISO8601().toDate().withMessage('Invalid date format')
	], 
	timeOffRequestController.getTimeOffRequestsByUserId.bind(timeOffRequestController)
);

timeOffRouter.post(
	'/',
	[
		body('userId').notEmpty().isInt().withMessage('UserId must be an integer'),
		body('start').optional().trim().escape().isISO8601().toDate().withMessage('Invalid date format'),
		body('end').optional().trim().escape().isISO8601().toDate().withMessage('Invalid date format'),
		body('title').notEmpty().trim().escape().isString().isLength({ max:255 }),
		body('description').notEmpty().trim().escape().isString().isLength({ max:255 }),
	],
	timeOffRequestController.addTimeOffRequest.bind(timeOffRequestController)
);

export default timeOffRouter;