import { QueryFailedError } from 'typeorm';
import { dataSource } from '~/server/utils/database';
import type { MonitoredResourcePostDto } from '~/server/dto/MonitoredResourceDto';
import { MonitoredResourceEntity } from '~/server/entity/MonitoredResourceEntity';
import { DatabaseError, ERROR_UNIQUE } from '~/server/exceptions/DatabaseError';

export const useMonitoredResourceService = () => {
  const repository = dataSource.getRepository(MonitoredResourceEntity);

  const create = async (dto: MonitoredResourcePostDto): Promise<MonitoredResourceEntity> => {
    try {
      const entity = repository.create(dto);

      return await repository.save(entity);
    } catch (error: unknown) {
      if (error instanceof QueryFailedError && error.message.includes('UNIQUE constraint failed')) {
        throw new DatabaseError(
          `Monitored resource with identifier '${dto.url}' already exists`,
          ERROR_UNIQUE
        );
      }

      throw error;
    }
  };

  return {
    create,
  };
};
