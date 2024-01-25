<script setup>
import favicon from "/favicon.ico"
import {ref} from "vue";
import {useMutation, useQueryClient} from "@tanstack/vue-query";
import axios from "axios";

const queryClient = useQueryClient();

const mutation = useMutation({
    mutationFn: () => {
      return axios.post('http://127.0.0.1:89/todos',{
        task: newTodoName.value,
        done:false,
        uhrzeit:getTimeStamp()
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
    onError: (error) => {
        errorMessage.value=error.response.data.message;
    }
});
let getTimeStamp = () => {
    const today = new Date();
    const date = today.getDate()+'.'+(today.getMonth()+1)+'.'+today.getFullYear();
    const time = today.getHours() + ":" + today.getMinutes();
    const dateTime = date +' '+ time+' Uhr';
    return dateTime;
}

let newTodoName = ref('');

let errorMessage = ref('');

</script>

<template>
  <div id="div1">
    <VImg
        :src="favicon"
        max-width="30"
        max-height="30"
    />
    <a id="a1"> TODO </a>
  </div>

  <div class="mb-3" id="div2">
    <input
        type="text"
        class="form-control"
        v-model=newTodoName
        id="input1"
        size="27"
        placeholder="Neuer Task.."
    />
    <button id="button1" class="icon-button" @click = "mutation.mutate()"></button>
  </div>
  <div id="div3" v-if="errorMessage">
    <a id="a2">{{ errorMessage }}</a>
  </div>
</template>

<style scoped>
@font-face {
  font-family: poppinsBold;
  src: url("/fonts/Poppins/Poppins-Bold.woff2");
}

#div1 {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  margin-right: 20px;
  margin-top: 15px;
}

#a1{
  font-family: poppinsBold;
  color: white;
}
#div2{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

#input1{
  color:grey;
  outline: solid;
  outline-width: thin;
  border-radius: 3px;
  padding: 5px 12px;
  resize: none;
  margin-top: 15px;
  margin-bottom: -26px;
  margin-left: -3px;
}

#button1{
  background-image:url("/favicon.ico") ;
  background-size: 23px;
  width: 22px;
  height: 22px;
  //margin-top: 18px;
  margin-bottom: -38.5px;
  margin-left: -10px;
}

#div3{
  margin-left: 20px;
  margin-top: 5px;
  margin-bottom: -16px;
}
#a2{
  color: #a902f8;
}

</style>