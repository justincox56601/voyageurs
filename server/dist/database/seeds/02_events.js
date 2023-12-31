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
        yield knex("events").del();
        // Inserts seed entries
        yield knex("events").insert([
            { fk_user__id: 1, title: 'Time Off Request', description: 'I want to take a day off', start: '2023-11-22 11:57:08', end: '2023-11-22 11:57:08' },
            { fk_user__id: 1, title: 'Time Off Request', description: 'Doctors Appointment', start: '2023-11-12 11:57:08', end: '2023-11-22 11:57:08' },
            { fk_user__id: 1, title: 'Time Off Request', description: 'Continuing Education', start: '2023-11-02 11:57:08', end: '2023-11-22 11:57:08' },
        ]);
    });
}
exports.seed = seed;
;
