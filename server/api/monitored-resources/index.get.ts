import { MonitoredResourceEntity } from '~/server/entity/MonitoredResourceEntity';

export default defineEventHandler(async () => {
  return await em.find(MonitoredResourceEntity);
});
