import { DataSource } from 'typeorm';
import { MonitoredResourceEntity } from '~/server/entity/MonitoredResourceEntity';

export const dataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'data/database.db',
  synchronize: true,
  logging: false,
  entities: [MonitoredResourceEntity],
  migrations: [],
  subscribers: [],
});

export const em = dataSource.manager;

export const initializeDataSource = async () => {
  if (dataSource.isInitialized) {
    return;
  }

  try {
    await dataSource.initialize();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.trace('DB: Failed to initialized database', error);

    throw error;
  }
};
