import { em } from '../../database/dataSource';
import { MonitoredResource } from '../../database/entity/MonitoredResource';

export default defineEventHandler(async () => {
  return await em.find(MonitoredResource);
});
