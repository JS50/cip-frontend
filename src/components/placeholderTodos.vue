<script setup>
import favicon from "/favicon.ico"

const props = defineProps(['message']);

</script>

<template>
  <div class="d-flex justify-center align-center flex-column pt-16">
    <img :src="favicon" alt="" width="100">
    <h1 id="text" class="pa-6"> {{ message }} </h1>
  </div>
</template>

<style scoped>

#text{
  font-family: Poppins, sans-serif;
  color: #FFFFFF;
  font-size: 20px;
  line-height: 30.1px;
}

</style>