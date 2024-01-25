<script setup>
import favicon from "/favicon.ico"

const props = defineProps(['message', 'bigText']);

</script>

<template>
  <div id="div1">
    <img :src="favicon" alt="" width="100">
    <h1 v-if="bigText" id="text"> {{ message }} </h1>
    <a v-else id="text"> {{ message }} </a>
  </div>
</template>

<style scoped>
@font-face {
  font-family: poppinsRegular;
  src: url("/fonts/Poppins/Poppins-Regular.woff2");
}
#div1{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  margin-top: 50px;

}

#text{
  font-family: poppinsRegular;
  padding-top: 20px;
  color: white;
}

</style>