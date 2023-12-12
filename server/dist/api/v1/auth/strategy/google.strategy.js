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
exports.GoogleStrategy = void 0;
const passport_google_oauth20_1 = require("passport-google-oauth20");
class GoogleStrategy {
    constructor(userService) {
        this._userService = userService;
    }
    googleStrategy() {
        return new passport_google_oauth20_1.Strategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['email', 'profile', 'https://www.googleapis.com/auth/calendar'],
            passReqToCallback: true,
            state: true,
        }, (request, accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
            try {
                //const user: UserResponseModel = (await this._userService.getUserByEmail((profile.emails??[])[0].value))[0]
                const user = {
                    name: 'Tech',
                    email: 'tech@voyageursschool.org',
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    googleId: profile.id
                };
                return done(null, user);
            }
            catch (e) {
                return done(e, undefined);
            }
        }));
    }
}
exports.GoogleStrategy = GoogleStrategy;
