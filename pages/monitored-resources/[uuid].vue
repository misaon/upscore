<template>
  <pre>{{ resource }}</pre>
</template>

<script setup lang="ts">
import { useMonitoredResourcesStore } from '~/stores/monitored-resources';

const { params } = useRoute();

const store = useMonitoredResourcesStore();
const resource = await store.getMonitoredResource(String(params.uuid));
</script>
