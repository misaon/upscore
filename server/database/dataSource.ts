import { DataSource } from 'typeorm';
import { MonitoredResource } from './entity/MonitoredResource';

const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'data/database.db',
  synchronize: true,
  logging: false,
  entities: [MonitoredResource],
  migrations: [],
  subscribers: [],
});

export const em = AppDataSource.manager;

export const initialize = async () => {
  if (AppDataSource.isInitialized) {
    return;
  }

  try {
    await AppDataSource.initialize();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.trace('DB: Failed to initialized database', error);

    throw error;
  }
};
