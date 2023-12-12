"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractService = void 0;
class AbstractService {
    constructor(knex) {
        this._knex = knex;
    }
}
exports.AbstractService = AbstractService;
