<script setup>
import { ref } from 'vue';

const dialog = ref(null);
const visible = ref(false);
const showModal = () => {
  dialog.value.showModal();
  visible.value = true;
}

defineExpose({
  showModal: showModal,
})
</script>

<template>
  <dialog
      ref="dialog"
      class="bg-purple-darken-4 rounded"
      id="dialogBox"
  >
    <form
        method="dialog"
        v-if="visible"
    >
      <slot/>
    </form>
  </dialog>
</template>

<style scoped>
#dialogBox {
  font-family: Poppins, sans-serif !important;
  font-weight: 400 !important;
  left: 0;
  right: 0;
  top: 0;
  bottom: 30%;
  margin: auto;
  position: absolute;
}
::backdrop {
  background-color: #452483;
  opacity: 0.45;
}

</style>