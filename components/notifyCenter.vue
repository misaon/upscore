<template>
  <div class="toast toast-center toast-top z-[1000]">
    <div
      v-for="notification in notifications"
      :key="notification.notifyTime"
      class="alert z-50"
      :class="{
        'alert-info': notification.type === 'info',
        'alert-success': notification.type === 'success',
        'alert-warning': notification.type === 'warning',
        'alert-error': notification.type === 'error',
      }"
    >
      <Icon
        v-if="notification.type === 'info'"
        name="line-md:chevron-right-circle"
        class="text-2xl"
      />
      <Icon
        v-else-if="notification.type === 'success'"
        name="line-md:confirm-circle"
        class="text-2xl"
      />
      <Icon
        v-else-if="notification.type === 'warning'"
        name="line-md:alert-circle"
        class="text-2xl"
      />
      <Icon
        v-else-if="notification.type === 'error'"
        name="line-md:close-circle"
        class="text-2xl"
      />
      <span>{{ notification.message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotifyStore } from '~/stores/notify';

const store = useNotifyStore();
const { notifications } = storeToRefs(store);
</script>
