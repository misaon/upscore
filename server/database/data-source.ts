import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { MonitoredResource } from './entity/MonitoredResource';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'data/database.sqlite',
  synchronize: true,
  logging: false,
  entities: [MonitoredResource],
  migrations: [],
  subscribers: [],
});

export const em = AppDataSource.manager;

export const initialize = async () => {
  if (AppDataSource.isInitialized) {
    // eslint-disable-next-line no-console
    console.log('DB: Already initialized');
    return;
  }

  try {
    await AppDataSource.initialize();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.trace('DB: Failed to initialized database', error);

    throw error;
  }

  // eslint-disable-next-line no-console
  console.log('DB: Successfully initialized database connection');
};
