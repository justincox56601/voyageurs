"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const service_1 = require("../../../../service");
class AuthService extends service_1.AbstractService {
    constructor(knex) {
        super(knex);
    }
    static getInstance(knex) {
        if (AuthService._instance == null) {
            AuthService._instance = new AuthService(knex);
        }
        return AuthService._instance;
    }
    serializeUser(user, done) {
        //decide what info about the users needs to be saved into the cookie
        //probably the _id, or the googleID, and the accesstoken
        return done(null, user);
    }
    deserializeUser(user, done) {
        //find user by id or something similar, then pass that user back
        return done(null, user);
    }
}
exports.AuthService = AuthService;
