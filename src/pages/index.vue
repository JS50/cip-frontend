<script setup>
import {useQuery} from "@tanstack/vue-query";
import {computed} from 'vue'
import todoListHeader from "@/components/todoListHeader.vue";
import axios from "axios";
import TodoList from "@/components/todoList.vue";
import PlaceholderTodos from "@/components/placeholderTodos.vue";
import EmptyTodos from "@/components/emptyTodos.vue";


const { isError, data:allTodosRef, error } = useQuery({
  staleTime: 1000 * 60 * 60,
  queryKey: ['todos'],
  queryFn: ( async () => {
    return (await axios.get('http://127.0.0.1:89/todos/')).data;
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
    <div v-if="(allTodosRef)" class="d-flex flex-column mx-4 px-2 ga-4 m-auto">
      <todo-list-header/>

      <div v-if="noTodos">
        <empty-todos/>
      </div>

      <div v-else-if="!noTodos">
        <todoList title="Offen" :todos="openTodos"/>
        <todoList title="Abgeschlossen" :todos="doneTodos"/>
      </div>
    </div>
    <div v-else-if="isError">
      <placeholder-todos :message="error.message"/>
    </div>
    <div v-else>
      <placeholder-todos message="Todos are loading.."/>
    </div>
  </main>
</template>

<style scoped>
main{
  background: #121212;
  width: 100vw;
  height: 100vh;
}
</style>