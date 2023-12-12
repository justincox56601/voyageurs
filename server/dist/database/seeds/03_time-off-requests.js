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
exports.seed = void 0;
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Deletes ALL existing entries
        yield knex("time_off_requests").del();
        // Inserts seed entries
        yield knex("time_off_requests").insert([
            { fk_user__id: 1, fk_event__id: 1, is_approved: false },
            { fk_user__id: 1, fk_event__id: 2, is_approved: false },
            { fk_user__id: 1, fk_event__id: 3, is_approved: false },
        ]);
    });
}
exports.seed = seed;
;
