"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const v1_1 = require("./v1");
exports.router = (0, express_1.Router)();
exports.router.use('/v1', v1_1.v1);
