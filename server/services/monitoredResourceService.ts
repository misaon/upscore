import { QueryFailedError } from 'typeorm';
import { dataSource } from '~/server/utils/database';
import type {
  MonitoredResourcePostDto,
  MonitoredResourceGetDto,
  MonitoredResourceDeleteDto,
} from '~/server/dto/MonitoredResourceDto';
import { MonitoredResourceEntity } from '~/server/entity/MonitoredResourceEntity';
import { DatabaseError, ERROR_NOT_FOUND, ERROR_UNIQUE } from '~/server/exceptions/DatabaseError';

export const useMonitoredResourceService = () => {
  const repository = dataSource.getRepository(MonitoredResourceEntity);

  const get = async (dto: MonitoredResourceGetDto): Promise<MonitoredResourceEntity | null> => {
    try {
      return await repository.findOneByOrFail({ uuid: dto.uuid });
    } catch {
      throw new DatabaseError(
        `Monitored resource with UUID '${dto.uuid}' not found`,
        ERROR_NOT_FOUND
      );
    }
  };

  const getAll = async (): Promise<MonitoredResourceEntity[]> => {
    return await repository.find();
  };

  const create = async (dto: MonitoredResourcePostDto): Promise<MonitoredResourceEntity> => {
    try {
      const entity = repository.create(dto);

      return await repository.save(entity);
    } catch (error: unknown) {
      if (error instanceof QueryFailedError && error.message.includes('UNIQUE constraint failed')) {
        throw new DatabaseError(
          `Monitored resource with url '${dto.url}' already exists`,
          ERROR_UNIQUE
        );
      }

      throw error;
    }
  };

  const _delete = async (dto: MonitoredResourceDeleteDto): Promise<void> => {
    const result = await repository.delete({ uuid: dto.uuid });

    if (result.affected === 0) {
      throw new DatabaseError(
        `Monitored resource with UUID '${dto.uuid}' not found`,
        ERROR_NOT_FOUND
      );
    }
  };

  return {
    get,
    getAll,
    create,
    delete: _delete,
  };
};
