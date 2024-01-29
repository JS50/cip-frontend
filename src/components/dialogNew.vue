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
      id="dialogBox"
      class="rounded"
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
  font-family: Poppins, sans-serif ;
  font-weight: 400;
  font-size: 22px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 30%;
  margin: auto;
  position: absolute;;
  background-color: #363636;
  color: #FFFFFF;
  border-color: #8685E7;
}
::backdrop {
  background-color: #9004fc;
  opacity: 0.25;
}

</style>