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
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.createTable('events', (table) => {
            table.increments('_id').primary();
            table.dateTime('_created_at').notNullable().defaultTo(knex.fn.now());
            table.dateTime('_modified_at').notNullable().defaultTo(knex.fn.now());
            table.dateTime('_deleted_at');
            table.integer('fk_user__id').notNullable().unsigned();
            table.string('title').notNullable();
            table.string('description');
            table.dateTime('start').notNullable();
            table.dateTime('end').notNullable();
            table.foreign('fk_user__id').references('users._id');
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        knex.schema.dropTable('events');
    });
}
exports.down = down;
