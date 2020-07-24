import { Container } from 'typedi';
import LoggerInstance from './logger';
import config from '../config';
import mailgun from 'mailgun-js';
import * as admin from 'firebase-admin';

///////////////////////////////////////////////////////////
//// Depependency Injection Loader to allow SOLID design //
///////////////////////////////////////////////////////////

export default ({ db, models }: { db: any, models: { name: string; model: any }[] }) => {
  try {
    models.forEach(m => {
      Container.set(m.name, m.model);
    });

    Container.set('db', db);
    Container.set('logger', LoggerInstance);
    Container.set('emailClient', mailgun({ apiKey: config.emails.apiKey, domain: config.emails.domain }));
    Container.set('firebase', admin.initializeApp({
      credential: admin.credential.cert(config.firebase.serviceAccount),
      databaseURL: config.firebase.db
    }));

    LoggerInstance.info('✌️ Dependencies injected into container');

  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};