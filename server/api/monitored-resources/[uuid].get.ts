import { useMonitoredResourceService } from '~/server/services/monitoredResourceService';
import { MonitoredResourceGetDto } from '~/server/dto/MonitoredResourceDto';
import { DatabaseError, ERROR_NOT_FOUND } from '~/server/exceptions/DatabaseError';
import { validateEventDto } from '~/server/utils/dto';

export default defineEventHandler(async (event) => {
  const monitoredResourceService = useMonitoredResourceService();

  const dto = await validateEventDto(MonitoredResourceGetDto, event.context.params);

  try {
    return await monitoredResourceService.get(dto);
  } catch (error: unknown) {
    if (error instanceof DatabaseError && error.code === ERROR_NOT_FOUND) {
      throw createError({
        statusCode: 404,
        message: error.message,
      });
    }

    throw createError({
      statusCode: 500,
      message: `Unknown error occurred`,
    });
  }
});
