"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
class UsersController {
    constructor(router) {
        this._router = router;
    }
    getUsers(req, res) {
        return res.status(200).json({ message: 'This works' });
    }
}
exports.UsersController = UsersController;
