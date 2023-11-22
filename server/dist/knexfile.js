"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
//dotenv.config({path: '../.env'});
dotenv_1.default.config({ path: './.env' });
// Update with your config settings.
const config = {
    development: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        migrations: {
            directory: __dirname + "/database/migrations",
        },
        seeds: {
            directory: __dirname + "/database/seeds",
        }
    },
    staging: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        migrations: {
            directory: __dirname + "/migrations",
        },
        seeds: {
            directory: __dirname + "/seeds",
        }
    },
    production: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        migrations: {
            directory: __dirname + "/database/migrations",
        },
        seeds: {
            directory: __dirname + "/database/seeds",
        }
    }
};
exports.default = config;
