import { useMonitoredResourceService } from '~/server/services/monitoredResourceService';
import { MonitoredResourcePostDto } from '~/server/dto/MonitoredResourceDto';
import { DatabaseError, ERROR_UNIQUE } from '~/server/exceptions/DatabaseError';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const monitoredResourceService = useMonitoredResourceService();

  const { dto, errors } = await validateDto<MonitoredResourcePostDto>(
    MonitoredResourcePostDto,
    body
  );

  if (!dto) {
    throw createError({
      statusCode: 400,
      message: errors!.join(', '),
    });
  }

  try {
    return await monitoredResourceService.create(dto);
  } catch (error: unknown) {
    if (error instanceof DatabaseError && error.code === ERROR_UNIQUE) {
      throw createError({
        statusCode: 409,
        message: error.message,
      });
    }

    throw createError({
      statusCode: 500,
      message: `Unknown error occurred`,
    });
  }
});
