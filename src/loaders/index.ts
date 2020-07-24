import { Application } from 'express';
import databaseLoader from './database';
import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import Logger from './logger';

///////////////////////////////
/// Loader Aggregation ////////
//////////////////////////////

type Props = { expressApp: Application }
export default async ({ expressApp }: Props) => {
  // Load & Connect To DB
  const db = await databaseLoader()
  Logger.info('✌️ DB loaded and connected!');

  // Load Common Express Middleware
  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');

  // Load Dependency Injector Container
  await dependencyInjectorLoader({
    db,
    models: [
    ],
  });
  Logger.info('✌️ Dependency Injector loaded');

  // Add More Loaders If Required...
}