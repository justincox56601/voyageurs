"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("./users/index"));
const index_2 = __importDefault(require("./time-off-requests/index"));
const index_3 = __importDefault(require("./auth/index"));
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        return res.sendStatus(401);
    }
};
const addUserPermissions = (req, res, next) => {
    // const tempUser = {
    // 	name: req.user?.displayName,
    // 	email: req.user?.emails[0].value,
    // 	photo: req.user?.photos[0].value,
    // 	permissions:[
    // 		'canCreateOwnTimeOffRequest',
    // 		'canEditOwnTimeOffRequest',
    // 		'canDeleteOwnTimeOffRequest',
    // 		'canViewOwnTimeOffRequest'
    // 	]
    // }
    // req.user = tempUser;
    next();
};
const v1Router = (0, express_1.Router)();
v1Router.use('/auth', index_3.default);
v1Router.use(isLoggedIn);
v1Router.use(addUserPermissions);
v1Router.use('/users', index_1.default);
v1Router.use('/time-off-requests', index_2.default);
exports.default = v1Router;
