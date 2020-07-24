import { Pool } from 'pg';
import LoggerInstance from './logger';
import config from '../config';

////////////////////////////////////////////
// Data Connection Layer Loader ////////////
////////////////////////////////////////////

export default async (): Promise<Pool> => {
  try {
    const db = new Pool({
      user: config.db.user,
      host: config.db.host,
      database: config.db.name,
      password: config.db.password,
      port: config.db.port,
    })
    // Test Connection
    const client = await db.connect()
    client.release()
    return db
    } catch (e) {
      LoggerInstance.error('🔥 Error on database loader: %o', e);
      throw e;
  }
};