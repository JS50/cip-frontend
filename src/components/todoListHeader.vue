<script setup>
import favicon from "/favicon.ico"
import {ref} from "vue";

const {arrayTodo} = defineProps(['arrayTodo']);

let newTodoName = ref('Neuer Task..');

const addTodo = () => {
  let today = new Date();
  let date = `${today.getDate()}.${today.getMonth()+1}.${today.getFullYear()}`;
  let time = `${today.getHours()}:${today.getMinutes()} Uhr`;
  let currentTime= `${date} ${time}`;

  arrayTodo.value.push({
    title: newTodoName, timestamp: currentTime, done: false, id:5
  })
};
const deleteTodo = (id) => {
  let newArray = arrayTodo.value.filter(todo => !(todo.id === id))
  arrayTodo.value = newArray;
};
const deleteAllTodos = () => {
  arrayTodo.value = ([]);
};
</script>

<template>
  <div>
    <VImg
        :src="favicon"
        width="50px"
    />
    <a> TODO </a>
  </div>

  <div class="mb-3">
    <input
        type="text"
        class="form-control"
        :value="newTodoName"
    />
    <v-btn @click = "addTodo">Button</v-btn>
    <v-btn @click= "deleteAllTodos" > Delete all Todos</v-btn>
  </div>
</template>