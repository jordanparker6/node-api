import * as express from 'express';
import routes from '../api';
import config from '../config';

/////////////////////////////////////
// Express Initialisation Loader ////
/////////////////////////////////////

export default async ({ app }: { app: express.Application }) => {

  app.get('/status', (req, res) => { res.status(200).end(); });
  app.head('/status', (req, res) => { res.status(200).end(); });
  app.enable('trust proxy');

  const middleware = [
    require('helmet')(),
    require('express-rate-limit')({ windowMs: 15*60*1000, max: 100 }),
    express.json({ limit: "20mb" }),
    express.urlencoded({ extended: true }),
    express.static(__dirname + '/public')
  ]
  app.use(middleware)
  app.use(config.api.prefix, routes())

  return app;
}