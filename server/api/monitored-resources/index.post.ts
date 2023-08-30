import { MonitoredResourceEntity } from '~/server/entity/MonitoredResourceEntity';
import { MonitoredResourcePostDto } from '~/server/dto/MonitoredResourceDto';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const dtoErrors = await validateDto<MonitoredResourcePostDto>(MonitoredResourcePostDto, {
    url: body.url,
  });

  if (dtoErrors) {
    setResponseStatus(event, 400);
    return { message: dtoErrors };
  }

  const resource = await em.insert(MonitoredResourceEntity, {
    url: body.url,
  });

  return await em.findOneBy(MonitoredResourceEntity, {
    id: resource.identifiers[0].id,
  });
});
