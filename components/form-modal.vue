<template>
  <div>
    <div @click="modal.showModal()">
      <slot name="button">
        <button class="btn">open modal</button>
      </slot>
    </div>
    <dialog ref="modal" class="modal">
      <form method="dialog" class="modal-box flex flex-col gap-4">
        <button ref="closeButton" class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
          ✕
        </button>

        <div>
          <h2 class="text-xl font-semibold">{{ properties.title }}</h2>
          <p class="text-base-content/50">{{ properties.subTitle }}</p>
          <div class="divider my-0"></div>
        </div>

        <slot name="body">
          <p class="py-4">Press ESC key or click on ✕ button to close</p>
        </slot>
      </form>
    </dialog>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

const modal = ref();
const closeButton = ref();

const properties = defineProps({
  title: {
    type: String as PropType<string>,
    required: true,
  },
  subTitle: {
    type: String as PropType<string>,
    required: true,
  },
});

defineExpose({
  closeModal: () => {
    if (closeButton.value) {
      closeButton.value.click();
    }
  },
});
</script>
