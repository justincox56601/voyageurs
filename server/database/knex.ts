import knex, { Knex } from 'knex';
import config from '../knexfile';
import dotenv from 'dotenv';

dotenv.config({path: '../.env'});

const environment: string | undefined = process.env.ENVIRONMENT || 'development';

export const KnexService: Knex = knex(config[environment])