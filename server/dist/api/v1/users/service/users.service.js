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
exports.UsersService = void 0;
const service_1 = require("../../../../service");
class UsersService extends service_1.AbstractService {
    constructor(knex) {
        super(knex);
    }
    static getInstance(knex) {
        if (UsersService._instance == null) {
            UsersService._instance = new UsersService(knex);
        }
        return UsersService._instance;
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._knex
                .column(['_id', '_created_at', '_modified_at', 'first_name', 'last_name', 'email', 'role'])
                .from('users')
                .whereNull('_deleted_at')
                .then((results) => {
                const users = [];
                for (const user of results) {
                    users.push({
                        _id: user._id,
                        _created_at: user._created_at,
                        firstName: user.first_name,
                        lastName: user.last_name,
                        email: user.email,
                        role: user.role,
                    });
                }
                return users;
            });
        });
    }
    getUsersById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._knex
                .column(['_id', '_created_at', '_modified_at', 'first_name', 'last_name', 'email', 'role'])
                .from('users')
                .whereNull('_deleted_at')
                .where('_id', '=', id)
                .then((results) => {
                const users = [];
                for (const user of results) {
                    users.push({
                        _id: user._id,
                        _created_at: user._created_at,
                        firstName: user.first_name,
                        lastName: user.last_name,
                        email: user.email,
                        role: user.role,
                    });
                }
                return users;
            });
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._knex
                .column(['_id', '_created_at', '_modified_at', 'first_name', 'last_name', 'email', 'role'])
                .from('users')
                .whereNull('_deleted_at')
                .where('email', '=', email)
                .limit(1)
                .then((results) => {
                const users = [];
                for (const user of results) {
                    users.push({
                        _id: user._id,
                        _created_at: user._created_at,
                        firstName: user.first_name,
                        lastName: user.last_name,
                        email: user.email,
                        role: user.role,
                    });
                }
                return users;
            });
        });
    }
}
exports.UsersService = UsersService;
