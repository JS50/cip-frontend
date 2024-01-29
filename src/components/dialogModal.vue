<script setup>
import { ref } from 'vue';

const dialog = ref(null);

const props = defineProps({
  classes: {
    type: String,
    default: "",
  },
});

const visible = ref(false);

const showModal = () => {
  dialog.value.showModal();
  visible.value = true;
};

defineExpose({
  show: showModal,
  close: (returnVal) => dialog.value?.close(returnVal),
  visible
});
</script>

<template>
  <dialog
      ref="dialog"
      @close="visible = false"
      class="bg-purple-darken-4 rounded d-flex justify-center align-center"
      style=""
  >
    <form
        method="dialog"
        v-if="visible"
        :class="{
        [props.classes]: props.classes,
      }"
    >
      <slot />
    </form>
  </dialog>
</template>

<style scoped>
::backdrop {
  background-color: mediumpurple;
  opacity: 0.25;
}
</style>