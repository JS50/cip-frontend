<script setup>
import favicon from "/favicon.ico"
</script>

<template>
  <div id="divEmpty1">
    <img src="/favicon.ico" alt="" width="100">
    <a id="aEmpty1"> What do you want to do today? </a>
  </div>
</template>

<style scoped>

@font-face {
  font-family: poppinsRegular;
  src: url("/fonts/Poppins/Poppins-Regular.woff2");
}



@media only screen and (max-width: 600px) {

  #divEmpty1{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;

  }

  #aEmpty1{
    font-family: poppinsRegular;
    padding-top: 20px;
    color: white;
  }
}

</style>