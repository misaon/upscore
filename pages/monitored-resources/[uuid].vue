<template>
  <div>
    <button type="submit" class="btn btn-error" @click="handleRemoveResource(String(params.uuid))">
      <template v-if="deletePending">
        <Icon name="line-md:loading-twotone-loop" class="text-3xl text-white" />
      </template>
      <template v-else>
        Delete
        <Icon name="line-md:remove" class="h-4 w-4" />
      </template>
    </button>

    <pre>{{ resource }}</pre>
  </div>
</template>

<script setup lang="ts">
import { useMonitoredResourcesStore } from '~/stores/monitoredResources';

const router = useRouter();
const { params } = useRoute();

const store = useMonitoredResourcesStore();
const resource = await store.getMonitoredResource(String(params.uuid));

const deletePending = ref(false);
const handleRemoveResource = async (uuid: string) => {
  deletePending.value = true;
  await store.deleteMonitoredResource(uuid);
  deletePending.value = false;

  router.push('/');
};
</script>
