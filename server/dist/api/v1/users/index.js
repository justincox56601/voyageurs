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
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const users_controller_1 = require("./controller/users.controller");
const users_service_1 = require("./service/users.service");
const knex_1 = require("../../../database/knex");
const googleapis_1 = require("googleapis");
const usersRouter = (0, express_1.Router)();
const usersService = users_service_1.UsersService.getInstance(knex_1.KnexService);
const usersController = new users_controller_1.UsersController(usersService);
usersRouter.get('/', usersController.getUsers.bind(usersController));
usersRouter.get('/user/:userId', [
    (0, express_validator_1.param)('userId').notEmpty().isInt().withMessage('UserId must be an integer'),
], usersController.getUsersById.bind(usersController));
usersRouter.get('/calendar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * TODO
     * From research is seems like I will not be able to use Passport Authentication
     * for this and will need to check into a different mathod for getting
     * authenticated for google calendar
     */
    const calendar = googleapis_1.google.calendar({
        version: 'v3',
    });
    const list = yield calendar.calendarList.list();
    return res.status(200).json({ list });
}));
exports.default = usersRouter;
