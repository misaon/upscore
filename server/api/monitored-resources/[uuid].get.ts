import { MonitoredResourceEntity } from '~/server/entity/MonitoredResourceEntity';

export default defineEventHandler(async (event) => {
  const uuid = event.context.params?.uuid as string;

  try {
    setResponseStatus(event, 200);

    return await em.findOneBy(MonitoredResourceEntity, {
      uuid,
    });
  } catch (error) {
    setResponseStatus(event, 404);

    return { message: error };
  }
});
