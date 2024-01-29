<script setup>
import {useMutation, useQueryClient} from "@tanstack/vue-query";
import {computed, ref} from 'vue';
import axios from "axios";
import DialogNew from "@/components/dialogNew.vue";


const queryClient = useQueryClient();

const props = defineProps(['todos', 'title']);

let todoDeleteId = ref();

const {mutate: deleteTodo} = useMutation({
  mutationFn: (todoId) => {
    return axios.delete('http://127.0.0.1:89/todos/' + todoId)
  },
  onSuccess: (data, todoId) => {
    queryClient.setQueryData(['todos'], olData => {
          let newData = structuredClone(olData);
          return newData.filter((todo) => (todo.id !== todoId));
        }
    )
  }
});

const {mutate: toggleDone} = useMutation({
  mutationFn: (todoId) => {
    return axios.patch('http://127.0.0.1:89/todos/' + todoId)
  },
  onSuccess: (data, todoId) => {
    queryClient.setQueryData(['todos'], oldData => {
          let newData = structuredClone(oldData);
          let indexTodo = newData.findIndex((todo => todo.id === todoId));
          newData[indexTodo].done = !newData[indexTodo].done;
          return newData;
        }
    )
  }
});

const showTodos = computed(() => {
  return !(props.todos.length === 0);
});

let dateStyler = (isoDateString) => {
  let returnDate = new Date(isoDateString).toLocaleString().slice(0, -3);
  return `${returnDate} Uhr`;
}


const dialog = ref(null);
const showDialog = (todoId) => {
  dialog.value.showModal();
  todoDeleteId.value = todoId;
}


</script>
<template>
  <div id="div1" v-if="showTodos">
    <a id="a1"> {{ title }}</a>
    <v-list id="vList1" density="compact" bg-color="#424242" class="mx-auto pa-2 mb-5 rounded-lg" witdh="290">
      <v-list-item
          id="vListItem1"
          v-for="(todo) in todos"
          :value="todo"
          density="comfortable"
          height="50"
          border="border"
      >
        <template v-slot:prepend>
          <input id="input1" type="checkbox" :key="todo.id" :checked="todo.done" @input="toggleDone(todo.id)">
        </template>
        <template v-slot:append>
          <button id="button1" :key="todo.id" class="icon-button" @click = "showDialog(todo.id)"></button>
        </template>
        <v-list-item-title v-text="todo.task"></v-list-item-title>
        <v-list-item-subtitle v-text="dateStyler(todo.created_at)"></v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </div>
  <dialog-new ref="dialog">
    <div id="dialogBox">
      <a class="d-flex justify-center">Bist du dir sicher?</a>
      <div class="d-flex justify-center align-content-lg-space-around">
        <button value="" class="ma-1 pl-1 pr-1 rounded bg-grey" @click="deleteTodo(todoDeleteId)">Löschen
        </button>
        <button class="ma-1 pl-1 pr-1 bg-grey rounded">Zurück</button>
      </div>
    </div>
  </dialog-new>
</template>

<style scoped>

#div1{
  margin-top: 6px;
  margin-bottom: -20px;
}
#a1{
  font-family: Poppins, sans-serif;
  font-weight: 300;
  color:white;
  margin-left: 5px;
}

#vList1{
  margin-top: 5px;
}

#input1{
  margin-right: 10px;
  margin-left: -5px;
}

#button1{
  background-image:url("/favicon.ico") ;
  background-size: 20px;
  width: 20px;
  height: 20px;
}
#vListItem1{
  font-family: Poppins, sans-serif !important;
  font-weight: 300 !important;
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}

#vListItem1 + #vListItem1 {
  margin-top: 10px !important;
}
</style>