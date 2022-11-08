import app from './app';
import config from './config';
import db from './db';
import server from './server';

const main = (config) => server(config.server).start(app(db(config.db)));

main(config());
