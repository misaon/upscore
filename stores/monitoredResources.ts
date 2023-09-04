import { ref } from 'vue';
import type { Ref } from 'vue';
import { useNotifyStore } from '~/stores/notify';
import type {
  MonitoredResourceDto,
  MonitoredResourcePostDto,
} from '~/server/dto/MonitoredResourceDto';

export const useMonitoredResourcesStore = defineStore('monitoredResources', () => {
  const { t } = useI18n();
  const notifyStore = useNotifyStore();

  const monitoredResources: Ref<MonitoredResourceDto[]> = ref([]);

  const fetchMonitoredResources = async () => {
    const result = await useFetch<MonitoredResourceDto[]>('/api/monitored-resources');

    monitoredResources.value = result.data.value || [];
  };

  const getMonitoredResource = async (uuid: string) => {
    const { data, error } = await useFetch<MonitoredResourceDto>(
      `/api/monitored-resources/${uuid}`
    );

    if (error.value) {
      notifyStore.notify(t('notification.error.some'), 'error');
      return;
    }

    return data;
  };

  const createMonitoredResource = async (formData: MonitoredResourcePostDto) => {
    const { data, error } = await useFetch<MonitoredResourceDto>('/api/monitored-resources', {
      method: 'POST',
      body: formData,
    });

    if (!data.value || error.value) {
      notifyStore.notify(t('notification.error.some'), 'error');
      return;
    }

    notifyStore.notify(
      t('notification.success.entityCreated', { entity: t('entity.monitoredResource') }),
      'success'
    );

    monitoredResources.value.push(data.value);
  };

  const deleteMonitoredResource = async (uuid: string) => {
    const { error } = await useFetch<MonitoredResourceDto>(`/api/monitored-resources/${uuid}`, {
      method: 'DELETE',
    });

    if (error.value) {
      notifyStore.notify(t('notification.error.some'), 'error');
      return;
    }

    notifyStore.notify(
      t('notification.success.entityCreated', { entity: t('entity.monitoredResource') }),
      'success'
    );

    monitoredResources.value = monitoredResources.value.filter((item) => item.uuid !== uuid);
  };

  return {
    monitoredResources,
    fetchMonitoredResources,
    getMonitoredResource,
    createMonitoredResource,
    deleteMonitoredResource,
  };
});
