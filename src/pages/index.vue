<script setup>
import {QueryClient, useMutation, useQuery} from "@tanstack/vue-query";
import {computed, ref, watch } from 'vue'
import todoListHeader from "@/components/todoListHeader.vue";
import axios from "axios";
import TodoList from "@/components/todoList.vue";
import DeleteTodos from "@/components/deleteTodos.vue";
import PlaceholderTodos from "@/components/placeholderTodos.vue";


const { isError, data:allTodosRef, error } = useQuery({
  staleTime: 1000 * 60 * 60,
  queryKey: ['todos'],
  queryFn: ( async () => {
    return (await axios.get('http://127.0.0.1:89/todos')).data;
  })
});

const openTodos = computed( () => {
  return allTodosRef.value.filter(todo => !todo.done);
});

const doneTodos = computed( () => {
  return allTodosRef.value.filter(todo => todo.done);
 });

const noTodos = computed( () => {
  return (allTodosRef.value.length === 0);
});

</script>

<template>
  <main>
    <div v-if="(allTodosRef)" class="d-flex flex-column pa-2 ga-4 m-auto">
      <todo-list-header/>

      <div v-if="noTodos">
        <placeholder-todos message="What do you want to do today?" :big-text="false"/>
      </div>

      <div id="div3" v-else-if="!noTodos">
        <todoList title="Offen" :todos="openTodos"/>
        <todoList title="Abgeschlossen" :todos="doneTodos"/>
        <delete-todos/>
      </div>
    </div>
    <div v-else-if="isError">
      <placeholder-todos :message="error.message" :big-text="true"/>
    </div>
    <div v-else>
      <placeholder-todos message="Todos are loading.." :big-text="true"/>
    </div>
  </main>
</template>

<style scoped>
main{
  background: black;
  position: absolute;
  width: 100%;
  min-height: 100%;
}

  #div3 {
    display: flex;
    flex-direction: column;
    margin-right: 15px;
    margin-left: 15px;
  }
</style>