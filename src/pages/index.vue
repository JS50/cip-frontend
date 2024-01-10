<script setup>
import favicon from "/favicon.ico"
import { useQuery } from "@tanstack/vue-query";
import {computed, ref, watch } from 'vue';
import emptyTodos from "@/components/emptyTodos.vue";
import todoListHeader from "@/components/todoListHeader.vue";

const { isLoading, isFetching, isError, data, error } = useQuery({
  queryKey: ['todos']
});

let newTodoName = ref('Neuer Task..');

let arrayTodo = ref ([
  {title: "Ins Styling reinkommen", timestamp: "23.12.23 20:00", done: true, id:1},
  {title: "Laravel Toturial", timestamp: "21.12.23 9:30", done: false, id:2},
  {title: "Das System kennenlernen", timestamp: "21.12.23 9:30", done: false, id:3},
  {title: "Bugs beheben", timestamp: "21.12.23 9:30", done: false, id:4},
  {title: "Ganz kurz vor gesund sein --------", timestamp: "21.12.23 9:30", done: true, id:5}
])

const doneTodos = computed( () => {
  return arrayTodo.value.filter(todo => todo.done);
});

const openTodos = computed( () => {
  return arrayTodo.value.filter(todo => !todo.done);
});

const showTodos = computed( () => {
  return (arrayTodo.value.length === 0);
});

const addTodo = () => {
  let today = new Date();
  let date = `${today.getDate()}.${today.getMonth()+1}.${today.getFullYear()}`;
  let time = `${today.getHours()}:${today.getMinutes()} Uhr`;
  let currentTime= `${date} ${time}`;

  arrayTodo.value.push({
    title: newTodoName.value, timestamp: currentTime, done: false, id:6
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
  <main class="d-flex flex-column pa-2 ga-4 m-auto">
<!--    <todo-list-header>{{arrayTodo}}</todo-list-header>-->
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
          size="24"
      />
      <button id="button1" class="icon-button" @click = "addTodo"></button>
    </div>
    <div v-if="showTodos">
      <emptyTodos></emptyTodos>
    </div>
    <div id="div3" v-else-if="!showTodos">
      <a id="a2" >Offen</a>
      <v-card
          class="mx-auto"
          width="290"
      >
        <v-list density="compact" bg-color="#424242">
          <v-list-item
              id="vListItem1"
              v-for="(todo, i) in openTodos"
              :value="todo"
              density="comfortable"
              height="50"
              border="border"
          >
            <template v-slot:prepend>
              <input id="input2" type="checkbox" :key="todo.id" :checked="todo.done" @input="() => todo.done = !todo.done">
            </template>
            <template v-slot:append>
              <button id="button2" class="icon-button" @click = "deleteTodo(todo.id)"></button>
            </template>
            <v-list-item-title v-text="todo.title"></v-list-item-title>
            <v-list-item-subtitle v-text="todo.timestamp"></v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card>
      <a id="a3">Abgeschlossen</a>
      <v-card
          class="mx-auto"
          width="290"
      >
        <v-list density="compact" bg-color="#424242">
          <v-list-item
              id="vListItem2"
              v-for="(todo, i) in doneTodos"
              :value="todo"
              density="comfortable"
              height="50"
              border="border"
          >
            <template v-slot:prepend>
              <input id="input3" type="checkbox" :key="todo.id" :checked="todo.done" @input="() => todo.done = !todo.done">
            </template>
            <template v-slot:append>
              <button id="button3" class="icon-button" @click = "deleteTodo(todo.id)"></button>
            </template>
            <v-list-item-title v-text="todo.title"></v-list-item-title>
            <v-list-item-subtitle v-text="todo.timestamp"></v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card>
      <v-btn
          @click= "deleteAllTodos"
          id="vButton"
          density="compact"
          size="small"
          max-width="290"
          color="#424242"
      > Delete all Todos</v-btn>
    </div>


  </main>
</template>

<style scoped>

main{
  background: #212121;
}

@font-face {
  font-family: poppinsBold;
  src: url("/fonts/Poppins/Poppins-Bold.woff2");
}
@font-face {
  font-family: poppinsLight;
  src: url("/fonts/Poppins/Poppins-Light.woff2");
}
@font-face {
  font-family: poppinsThin;
  src: url("/fonts/Poppins/Poppins-Thin.woff2");
}


@media only screen and (max-width: 600px) {
  #div1{
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    margin-right: 20px;
    margin-top: 10px;
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
    margin-right: 8px;
  }

  #button1{
    background-image:url("/favicon.ico") ;
    background-size: 20px;
    width: 22px;
    height: 22px;
    margin-left: -9px;
  }

  #div3{
    display: flex;
    flex-direction: column;
  }

  #a2{
    font-family: poppinsLight;
    font-size: small;
    color:white;
    margin-top: -10px;
    margin-left: 10px;
    margin-bottom: 10px;
  }
  #a3{
    font-family: poppinsLight;
    font-size: small;
    color:white;
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  #input2{
    margin-right: 10px;
    margin-left: -5px;
  }

  #input3{
    margin-right: 10px;
    margin-left: -5px;
  }
}

#button2{
  background-image:url("/favicon.ico") ;
  background-size: 20px;
  width: 20px;
  height: 20px;
}

#button3{
  background-image:url("/favicon.ico") ;
  background-size: 20px;
  width: 20px;
  height: 20px;
}

#vListItem1{
  font-family: poppinsLight !important;
}
#vListItem2{
  font-family: poppinsLight !important;
}

#vButton{
  margin-top: 20px !important;
  margin-left: 7.5px !important;
}



</style>