import { em } from '../../database/data-source';
import { MonitoredResource } from '../../database/entity/MonitoredResource';

export default defineEventHandler(async () => {
  return await em.find(MonitoredResource);
});
