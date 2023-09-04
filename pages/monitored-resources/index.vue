<template>
  <div>
    <FormModal ref="modal" title="Create resource" sub-title="Create your new monitored resource.">
      <template #button>
        <button class="btn-primary btn">Create resource</button>
      </template>
      <template #body>
        <FormKit
          v-slot="{ state: { valid } }"
          type="form"
          :actions="false"
          form-class="flex flex-col gap-4"
          @submit="handleCreateResourceFormSubmit"
        >
          <div class="flex flex-col gap-1">
            <FormKit
              type="text"
              name="url"
              label="Resource url"
              help="Url to resource which you want monitor"
              validation="required"
            />
          </div>

          <div class="flex justify-end">
            <button type="submit" class="btn-primary btn" :disabled="!valid || submitPending">
              <template v-if="submitPending">
                <Icon name="line-md:loading-twotone-loop" class="text-3xl text-white" />
              </template>
              <template v-else>
                Create
                <Icon name="line-md:chevron-right" />
              </template>
            </button>
          </div>
        </FormKit>
      </template>
    </FormModal>
  </div>
</template>

<script setup lang="ts">
import type { MonitoredResourcePostDto } from '~/server/dto/MonitoredResourceDto';
import { useMonitoredResourcesStore } from '~/stores/monitoredResources';

const modal = ref();
const submitPending = ref(false);

const store = useMonitoredResourcesStore();
const handleCreateResourceFormSubmit = async (formData: MonitoredResourcePostDto) => {
  submitPending.value = true;
  await store.createMonitoredResource(formData);
  submitPending.value = false;

  modal.value.closeModal();
};
</script>
