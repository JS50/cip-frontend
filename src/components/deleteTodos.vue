<script setup>
import {useMutation, useQueryClient} from "@tanstack/vue-query";
import axios from "axios";

const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: () => {
    return axios.delete('http://127.0.0.1:89/todos')
  },
  onSuccess:() => {
    queryClient.setQueryData(['todos'], []);
  }
});
</script>

<template>
  <v-btn
      @click= "mutation.mutate()"
      id="vButton"
      density="compact"
      size="medium"
      max-width="290"
      color="#424242"
  > Delete all Todos</v-btn>
</template>

<style scoped>

#vButton{
  font-family: Poppins, sans-serif;
  font-size: small;
  margin-left: 0.5px !important;
  margin-top: 15px;
}
</style>