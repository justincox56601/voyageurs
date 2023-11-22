import type { Knex } from "knex";
import dotenv from 'dotenv';

//dotenv.config({path: '../.env'});
dotenv.config({path: './.env'});

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
	client: 'mysql2',
    connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
    },
	migrations:{
		directory: __dirname + "/database/migrations",
	},
	seeds:{
		directory:  __dirname + "/database/seeds",
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
	migrations:{
		directory: __dirname + "/migrations",
	},
	seeds:{
		directory:  __dirname + "/seeds",
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
	migrations:{
		directory: __dirname + "/database/migrations",
	},
	seeds:{
		directory:  __dirname + "/database/seeds",
	}
  }

};

export default config;
