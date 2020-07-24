import 'reflect-metadata';
import loaders from './loaders'
import Logger from './loaders/logger';
import config from './config';
import express from 'express';

async function startServer() {

  const app = express();

  await loaders({ expressApp: app });

  app.listen(config.port, err => {
    if (err) {
        Logger.error(err);
        process.exit(1);
        return;
      }
      Logger.info(`
        ################################################
        🛡️  Server listening on port: ${config.port} 🛡️
        ################################################
      `);
    });
}

startServer();

