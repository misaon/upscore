<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useMonitoredResourcesStore } from '~/stores/monitoredResources';

const store = useMonitoredResourcesStore();
await store.fetchMonitoredResources();

// const { status, data } = useEventSource('/api/sse');
</script>
