import express, {Express, Request, Response, NextFunction} from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv'; 
import MySQLStore from 'express-mysql-session';
import * as mysql2 from "mysql2/promise";

import v1Router from './api/v1';
import passport from 'passport';


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

//register middlewear
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const mysqlSessionOptions = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: parseInt(process.env.DB_PORT!, 10)
};
//@ts-ignore
const store = MySQLStore(session);

app.use(session({
	secret: process.env.SESSION_SECRET!,
	resave: false,
	cookie: {
		maxAge: 1000*60*30, // 1000ms * 60 seconds * 30 minutes
		secure: process.env.ENVIRONMENT === 'production' ? true : false
	}, 
	saveUninitialized: false,
	store: new store(mysqlSessionOptions)
}));

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/v1', v1Router ) 



app.listen(port, ()=>{
	console.log(`Server is listening on port: ${port}`)
})