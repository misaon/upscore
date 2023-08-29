import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useNotifyStore } from '~/stores/notify';
import type { IMonitoredResource } from '~/server/database/entity/MonitoredResource';
import type { MonitoredResourcePostDto } from '~/server/dto/MonitoredResourceDto';

export const useMonitoredResourcesStore = defineStore('monitoredResources', () => {
  const { t } = useI18n();
  const notifyStore = useNotifyStore();

  const monitoredResources: Ref<IMonitoredResource[]> = ref([]);

  const fetchMonitoredResources = async () => {
    const result = await useFetch('/api/monitored-resources');
    monitoredResources.value = result.data.value as unknown as IMonitoredResource[];
  };

  const getMonitoredResource = async (uuid: string) => {
    const { data, error } = await useFetch(`/api/monitored-resources/${uuid}`);

    if (error.value) {
      notifyStore.notify(t('notification.error.some'), 'error');
      return;
    }

    return data;
  };

  const addMonitoredResource = async (formData: MonitoredResourcePostDto) => {
    const { data, error } = await useFetch('/api/monitored-resources', {
      method: 'POST',
      body: formData,
    });

    if (error.value) {
      notifyStore.notify(t('notification.error.some'), 'error');
      return;
    }

    notifyStore.notify(
      t('notification.success.entityCreated', { entity: t('entity.monitoredResource') }),
      'success'
    );
    monitoredResources.value.push(data.value as unknown as IMonitoredResource);
  };

  return {
    monitoredResources,
    fetchMonitoredResources,
    getMonitoredResource,
    addMonitoredResource,
  };
});