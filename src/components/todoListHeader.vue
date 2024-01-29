<script setup>
import {ref} from "vue";
import {useMutation, useQueryClient} from "@tanstack/vue-query";
import axios from "axios";

const queryClient = useQueryClient();

const {mutate: addTodo} = useMutation({
    mutationFn: () => {
      return axios.post('http://127.0.0.1:89/todos',{
        task: newTodoName.value,
        done: false
      })
    },
    onSuccess: (data) => {
      newTodoName.value = '';
      errorMessage.value = '';
      queryClient.setQueryData(['todos'], oldData => {
        let newData = structuredClone(oldData);
        newData.unshift(data.data);
        return newData;
        }
      )
    },
    onError: () => {
        errorMessage.value= 'Fehler. Bitte benenne erneut einen Task.';
        newTodoName.value = '';
    }
});

let newTodoName = ref('');

let errorMessage = ref('');
</script>

<template>
  <div class="d-flex justify-center align-center mt-12">
    <img
        src="src/assets/sw-icon-purple%201.svg"
        width="27"
        height="35"
        alt=""
    />
    <a id="title" class="ml-2"> TODO </a>
  </div>

  <div class="d-flex align-center ga-4">
    <input
        id="inputTodoName"
        class="pt-2 pr-4 pb-2 pl-4 w-100"
        type="text"
        v-model=newTodoName
        placeholder="Neuer Task.."
    />
    <button id="submitButton" @click = "addTodo()"></button>
  </div>
  <div v-if="errorMessage" class="d-flex align-center justify-center">
    <a id="errorMessage">{{ errorMessage }}</a>
  </div>
</template>

<style scoped>
#title{
  font-family: Poppins,sans-serif;;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  letter-spacing: -0.5px;
  color: #FFFFFF;
}

#inputTodoName{
  color:#B9B9B9DE;
  opacity: 0.87;
  font-family: Poppins, sans-serif;
  font-weight: 300;
  font-size: 18px;
  line-height: 27.09px;

  border-color: #979797;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
}

#submitButton{
  background-image:url("/src/assets/send.svg") ;
  width: 24px;
  height: 24px;
}

#errorMessage{
  color: #9004fc;
  font-family: Poppins, sans-serif;
  font-weight: 500;
  font-size: 18px;
}
</style>