import { em } from '../../database/data-source';
import { MonitoredResource } from '../../database/entity/MonitoredResource';

export default defineEventHandler(async (event) => {
  const uuid = event.context.params?.uuid as string;

  try {
    setResponseStatus(event, 200);

    return await em.findOneBy(MonitoredResource, {
      uuid,
    });
  } catch (error) {
    setResponseStatus(event, 404);

    return { message: error };
  }
});
