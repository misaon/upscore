import { useMonitoredResourceService } from '~/server/services/monitoredResourceService';
import { MonitoredResourcePostDto } from '~/server/dto/MonitoredResourceDto';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const monitoredResourceService = useMonitoredResourceService();

  const { dto, errors } = await validateDto<MonitoredResourcePostDto>(
    MonitoredResourcePostDto,
    body
  );

  if (!dto) {
    setResponseStatus(event, 400);
    return { message: errors };
  }

  return monitoredResourceService.create(dto);
});
