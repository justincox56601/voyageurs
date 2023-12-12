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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
const service_1 = require("./service");
const knex_1 = require("../../../database/knex");
const controller_1 = require("./controller");
const users_service_1 = require("../users/service/users.service");
const google_strategy_1 = require("./strategy/google.strategy");
dotenv_1.default.config();
const authService = service_1.AuthService.getInstance(knex_1.KnexService);
const userService = users_service_1.UsersService.getInstance(knex_1.KnexService);
const authController = new controller_1.AuthController(authService);
const googleStrategy = new google_strategy_1.GoogleStrategy(userService);
passport_1.default.use(googleStrategy.googleStrategy());
passport_1.default.serializeUser((user, done) => authService.serializeUser(user, done));
passport_1.default.deserializeUser((user, done) => authService.deserializeUser(user, done));
const authRouter = (0, express_1.Router)();
authRouter.get('/google', passport_1.default.authenticate('google'), (req, res) => {
    return res.status(200);
});
authRouter.get('/google/redirect', passport_1.default.authenticate('google', {
    successRedirect: '/api/v1/auth/google/success',
    failureRedirect: '/api/v1/auth/google/failure'
}), (req, res) => {
    return res.status(200);
});
authRouter.get('/google/success', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({ mes: 'hello' });
}));
authRouter.get('/google/failure', (req, res) => {
    res.send('something went wrong');
});
exports.default = authRouter;
