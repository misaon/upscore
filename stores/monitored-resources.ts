import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useNotifyStore } from '~/stores/notify';
import type { IMonitoredResource } from '~/server/database/entity/MonitoredResource';
import type { MonitoredResourcePostDto } from '~/server/dto/monitored-resource.post.dto';

export const useMonitoredResourcesStore = defineStore('monitored-resources', () => {
  const { t } = useI18n();
  const notifyStore = useNotifyStore();

  const monitoredResources: Ref<IMonitoredResource[]> = ref([]);

  async function fetchMonitoredResources() {
    const result = await useFetch('/api/monitored-resources');
    monitoredResources.value = result.data.value as unknown as IMonitoredResource[];
  }

  async function getMonitoredResource(uuid: string) {
    const { data, error } = await useFetch(`/api/monitored-resources/${uuid}`);

    if (error.value) {
      notifyStore.notify(t('notification.error.some'), 'error');
      return;
    }

    return data;
  }

  async function addMonitoredResource(formData: MonitoredResourcePostDto) {
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
  }

  return {
    monitoredResources,
    fetchMonitoredResources,
    getMonitoredResource,
    addMonitoredResource,
  };
});
