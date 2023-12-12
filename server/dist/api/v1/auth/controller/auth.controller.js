"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const controller_1 = require("../../../../controller");
class AuthController extends controller_1.AbstractController {
    constructor(authService) {
        super();
        this._authService = authService;
    }
    login(req, res) {
    }
}
exports.AuthController = AuthController;
