<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const { status, data } = useEventSource('/api/sse')
</script>
