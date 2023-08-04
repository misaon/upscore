<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useMonitoredResourcesStore } from '~/stores/monitored-resources';

const store = useMonitoredResourcesStore();
await store.fetchMonitoredResources();

// const { status, data } = useEventSource('/api/sse');
</script>
