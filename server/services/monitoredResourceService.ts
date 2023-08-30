import { dataSource } from '~/server/utils/database';
import type { MonitoredResourcePostDto } from '~/server/dto/MonitoredResourceDto';
import { MonitoredResourceEntity } from '~/server/entity/MonitoredResourceEntity';

export const useMonitoredResourceService = () => {
  const repository = dataSource.getRepository(MonitoredResourceEntity);

  const create = (dto: MonitoredResourcePostDto): Promise<MonitoredResourceEntity> => {
    const entity = repository.create(dto);

    return repository.save(entity);
  };

  return {
    create,
  };
};
