import { validate } from 'class-validator';
import { em } from '../../database/dataSource';
import { MonitoredResource } from '../../database/entity/MonitoredResource';
import { MonitoredResourcePostDto } from '../../dto/MonitoredResourceDto';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const resourceDto = new MonitoredResourcePostDto();
  resourceDto.url = body.url;

  const errors = await validate(resourceDto);
  if (errors.length > 0) {
    setResponseStatus(event, 400);
    return { errors: errors.map((error) => error.constraints) };
  }

  try {
    setResponseStatus(event, 201);

    const resource = await em.insert(MonitoredResource, {
      url: body.url,
    });

    return await em.findOneBy(MonitoredResource, {
      id: resource.identifiers[0].id,
    });
  } catch (error) {
    setResponseStatus(event, 500);
    return { message: error };
  }
});
