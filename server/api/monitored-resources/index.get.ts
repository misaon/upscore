import { useMonitoredResourceService } from '~/server/services/monitoredResourceService';

export default defineEventHandler(async () => {
  const monitoredResourceService = useMonitoredResourceService();

  return await monitoredResourceService.getAll();
});
