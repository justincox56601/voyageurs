"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const express_1 = require("express");
exports.users = (0, express_1.Router)();
exports.users.get('/', (req, res) => {
    return res.status(200).json({ message: 'This works' });
});
