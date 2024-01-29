<script setup>
import {useMutation, useQueryClient} from "@tanstack/vue-query";
import {computed, ref} from 'vue';
import axios from "axios";
import DialogNew from "@/components/dialog.vue";

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
  todoDeleteId.value = todoId;
  dialog.value.showModal();
}


</script>
<template>
  <div v-if="showTodos">
    <div class="mb-1">
      <a id="todoCategoryTitle"> {{ title }}</a>
    </div>
    <div class="d-flex flex-column justify-center align-center">
      <v-card
          id="todoCard"
          class="mb-4 align-self-stretch"
          color="#363636"
          v-for="(todo) in todos"
      >
        <template #title>
          <a
              id="todoTitle"
          >{{todo.task}}</a>
        </template>
        <template #subtitle>
          <a
              id="todoTimestamp"
          >{{dateStyler(todo.created_at)}}
          </a>
        </template>
        <template v-slot:prepend>
          <input id="checkbox" type="checkbox" :key="todo.id" :checked="todo.done" @input="toggleDone(todo.id)">
        </template>
        <template v-slot:append>
          <button id="deleteButton" :key="todo.id" @click = "showDialog(todo.id)"></button>
        </template>
      </v-card>
    </div>


  </div>
  <dialog-new ref="dialog">
    <div class="pa-1">
      <a class="d-flex justify-center ma-1 px-1">Bist du dir sicher?</a>
      <div class="d-flex justify-space-between">
        <button class="mx-2 mb-3 px-1 rounded" style="background-color: #8685E7" @click="deleteTodo(todoDeleteId)">Löschen
        </button>
        <button class="mx-2 mb-3 px-1 rounded" style="background-color: #8685E7">Zurück</button>
      </div>
    </div>
  </dialog-new>
</template>

<style scoped>
input[type="checkbox"]{
  border-radius: 50%;
  width: 16px;
  height: 16px;
  padding: 0;
  border: 1.5px solid #FFFFFF;
  appearance: none;
  background-color: #363636;
  outline: none;
  transition: outline 0.1s
}

input[type="checkbox"]:checked{
  content: 's';
  width: 20px;
  height: 20px;
  border-color: #8685E7;
  background-image: url("src/assets/Vector.svg");
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: center;
}

#todoCategoryTitle{
  font-family: Poppins, sans-serif;
  color: #FFFFFF;
  font-size: 14px;
  line-height: 21.07px;
  font-weight: 300;
}

#todoCard{
  border-width: 1.5px;
  border-radius: 4px;
}

#todoTitle{
  font-family: Lato, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: -0.32px;
  color: #FFFFFF;
}

#todoTimestamp{
  font-family: Lato, sans-serif;
  color: #AFAFAF;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.32px;
}

#deleteButton{
  background-image:url("src/assets/delete-10431.svg") ;
  background-size: 20px;
  width: 20px;
  height: 20px;
}
</style>