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
exports.UsersController = void 0;
const express_validator_1 = require("express-validator");
const controller_1 = require("../../../../controller");
class UsersController extends controller_1.AbstractController {
    constructor(usersService) {
        super();
        this._usersService = usersService;
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this._usersService.getUsers();
                console.log(req.user);
                return res.status(200).json(this._addMetaData(data));
            }
            catch (e) {
                //todo.  store the error message in the database to be reviewed later. (error code, error message)
                return res.status(500).json({ message: 'An unknown error has occurred.  Please try again later.' });
            }
        });
    }
    getUsersById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(500).json({ errors: errors.array() });
            }
            const { userId } = (0, express_validator_1.matchedData)(req);
            try {
                const data = yield this._usersService.getUsersById(userId);
                console.log(req.user);
                return res.status(200).json(this._addMetaData(data));
            }
            catch (e) {
                //todo.  store the error message in the database to be reviewed later. (error code, error message)
                return res.status(500).json({ message: 'An unknown error has occurred.  Please try again later.' });
            }
        });
    }
}
exports.UsersController = UsersController;
