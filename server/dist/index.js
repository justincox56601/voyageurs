"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_mysql_session_1 = __importDefault(require("express-mysql-session"));
const v1_1 = __importDefault(require("./api/v1"));
const passport_1 = __importDefault(require("passport"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
//register middlewear
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const mysqlSessionOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10)
};
//@ts-ignore
const store = (0, express_mysql_session_1.default)(express_session_1.default);
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 30, // 1000ms * 60 seconds * 30 minutes
        secure: process.env.ENVIRONMENT === 'production' ? true : false
    },
    saveUninitialized: false,
    store: new store(mysqlSessionOptions)
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/api/v1', v1_1.default);
app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
