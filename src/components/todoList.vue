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
    <v-card
        id="todoCard"
        class="rounded ma-4"
        color="#363636"
        height="72"
        width="327"
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
            <input id="checkbox"  type="checkbox" :key="todo.id" :checked="todo.done" @input="toggleDone(todo.id)">
        </template>
        <template v-slot:append>
          <button id="button1" :key="todo.id" @click = "showDialog(todo.id)"></button>
        </template>
    </v-card>

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


#todoCard{
  border-width: 1.5px;
}
#todoTitle{
  font-family: Lato, sans-serif;
  color: #FFFFFF;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: -0.32px;
}
#todoTimestamp{
  font-family: Lato, sans-serif;
  color: #AFAFAF;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.32px;
}
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

#button1{
  background-image:url("src/assets/delete-10431.svg") ;
  background-size: 20px;
  width: 20px;
  height: 20px;
}

</style>