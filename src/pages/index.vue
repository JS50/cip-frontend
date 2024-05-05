<script setup>
import sendIcon from "@/assets/sw-send-icon.svg";
import smallLogo from "@/assets/sw-logo-small.svg";
import emptyLogo from "@/assets/sw-todo-empty.svg";
import taskContainer from "../components/taskContainer.vue";
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { ref, computed } from 'vue';
import axios from "axios";

const queryClient = useQueryClient();

const { isLoading, isFetching, data: todoQuery, error } = useQuery({
  queryKey: ['todos'],
  queryFn: async () => {
    return (await axios.get('http://localhost/todos')).data;
  }
});

// I actually hate this but I'm noob so I don't know better way
function invalidateTodosQuery() { queryClient.invalidateQueries({ queryKey: ['todos'] }); }
const { mutate: postTodo } = useMutation({
  mutationFn: (newTodo) => axios.post('http://localhost/todos', newTodo), onSuccess: invalidateTodosQuery
});
const { mutate: deleteTodo } = useMutation({
  mutationFn: (task) => axios.delete(`http://localhost/todos/${task.id}`), onSuccess: invalidateTodosQuery
});
const { mutate: updateTodo } = useMutation({
  mutationFn: (task) => axios.put(`http://localhost/todos/${task.id}`, task), onSuccess: invalidateTodosQuery
});

const completedTasks = computed(() => {
  return todoQuery.value.filter((t) => t.completed === 1);
});

const incompleteTasks = computed(() => {
  return todoQuery.value.filter((t) => t.completed === 0);
});

const newTodo = ref('');
const time = ref('');

clock();
function clock() {
  const today = new Date();
  let h = today.getHours();
  h = h === 0 ? "0" + h : h;
  let m = today.getMinutes();
  // Pad m if needed
  m = m < 10 ? "0" + m : m;

  time.value = h + ":" + m;
  setTimeout(clock, 1000);
}

function addTodo() {
  if (newTodo.value.length === 0) return;
  postTodo({task: newTodo.value, completed: 0});
}

function updateCompleted(task) {
  const complete = Number(!task.completed);
  updateTodo({id: task.id, completed: complete});
}

function deleteAllTodos(tasks) {
  for (let i = 0; i < tasks.length; i++) {
    deleteTodo(tasks[i]);
  }
}

</script>

<template>
  <main class="d-flex flex-column pa-2 ga-4">
      <div id="statusBar">
        <div class="iphoneNotch"></div>
        
        <div id="statusIcons">
          <span id="currentTime" class="sw-body-large-medium sw-text-white">{{ time }}</span>
          <div id="rightIcons">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.6667 0.666748H15.6667C15.1145 0.666748 14.6667 1.11446 14.6667 1.66675V10.3334C14.6667 10.8857 15.1145 11.3334 15.6667 11.3334H16.6667C17.219 11.3334 17.6667 10.8857 17.6667 10.3334V1.66675C17.6667 1.11446 17.219 0.666748 16.6667 0.666748ZM11.0001 3.00008H12.0001C12.5524 3.00008 13.0001 3.4478 13.0001 4.00008V10.3334C13.0001 10.8857 12.5524 11.3334 12.0001 11.3334H11.0001C10.4478 11.3334 10.0001 10.8857 10.0001 10.3334V4.00008C10.0001 3.4478 10.4478 3.00008 11.0001 3.00008ZM7.33341 5.33341H6.33341C5.78113 5.33341 5.33341 5.78113 5.33341 6.33341V10.3334C5.33341 10.8857 5.78113 11.3334 6.33341 11.3334H7.33341C7.8857 11.3334 8.33341 10.8857 8.33341 10.3334V6.33341C8.33341 5.78113 7.8857 5.33341 7.33341 5.33341ZM2.66675 7.33341H1.66675C1.11446 7.33341 0.666748 7.78113 0.666748 8.33341V10.3334C0.666748 10.8857 1.11446 11.3334 1.66675 11.3334H2.66675C3.21903 11.3334 3.66675 10.8857 3.66675 10.3334V8.33341C3.66675 7.78113 3.21903 7.33341 2.66675 7.33341Z" fill="white"/></svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.33045 2.60814C10.5463 2.60823 12.6775 3.45967 14.2835 4.98647C14.4044 5.10435 14.5977 5.10286 14.7168 4.98314L15.8728 3.81647C15.9331 3.75575 15.9667 3.6735 15.9662 3.58792C15.9657 3.50234 15.9311 3.42048 15.8701 3.36047C11.655 -0.679076 5.00522 -0.679076 0.79012 3.36047C0.729062 3.42044 0.694418 3.50227 0.693855 3.58785C0.693292 3.67343 0.726856 3.7557 0.78712 3.81647L1.94345 4.98314C2.06248 5.10304 2.25593 5.10453 2.37679 4.98647C3.98294 3.45957 6.11434 2.60813 8.33045 2.60814ZM8.33045 6.4038C9.54794 6.40373 10.722 6.85626 11.6245 7.67347C11.7465 7.78945 11.9388 7.78694 12.0578 7.6678L13.2125 6.50114C13.2733 6.43994 13.307 6.35693 13.3061 6.27066C13.3052 6.1844 13.2698 6.10208 13.2078 6.04214C10.4596 3.48576 6.20365 3.48576 3.45545 6.04214C3.39338 6.10208 3.35796 6.18444 3.35714 6.27073C3.35633 6.35702 3.39019 6.44003 3.45112 6.50114L4.60545 7.6678C4.72444 7.78694 4.91672 7.78945 5.03879 7.67347C5.94066 6.8568 7.11377 6.40431 8.33045 6.4038ZM10.6434 8.95762C10.6452 9.04413 10.6112 9.12753 10.5495 9.18814L8.55212 11.2038C8.49357 11.263 8.41374 11.2964 8.33045 11.2964C8.24716 11.2964 8.16734 11.263 8.10879 11.2038L6.11112 9.18814C6.04941 9.12749 6.01546 9.04406 6.01729 8.95755C6.01912 8.87104 6.05657 8.78913 6.12079 8.73114C7.39636 7.65225 9.26455 7.65225 10.5401 8.73114C10.6043 8.78917 10.6417 8.87112 10.6434 8.95762Z" fill="white"/></svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.35" d="M0.5 3.00016C0.5 1.80354 1.47005 0.833496 2.66667 0.833496H19.3333C20.53 0.833496 21.5 1.80355 21.5 3.00016V9.00016C21.5 10.1968 20.53 11.1668 19.3333 11.1668H2.66667C1.47005 11.1668 0.5 10.1968 0.5 9.00016V3.00016Z" stroke="white"/><path opacity="0.4" d="M23 4.00024V8.00024C23.8047 7.66147 24.328 6.87338 24.328 6.00024C24.328 5.12711 23.8047 4.33902 23 4.00024Z" fill="white"/><path d="M2 3.4335C2 2.82598 2.49249 2.3335 3.1 2.3335H18.9C19.5075 2.3335 20 2.82598 20 3.4335V8.56683C20 9.17434 19.5075 9.66683 18.9 9.66683H3.1C2.49249 9.66683 2 9.17434 2 8.56683V3.4335Z" fill="white"/></svg>
          </div>
        </div>

      </div>

      <div id="todoHeader">
        <VImg class='headerLogo' :src="smallLogo" width="27px" height="35px"/>
        <span class="sw-large-title-bold">TODO</span>
      </div>

      <div id="todoBody">

        <div id="todoInput">
          <input type="text" v-model="newTodo" class="newTodo sw-small-title sw-text-white" placeholder="Add new todo">
          <VImg :src="sendIcon" class="addIcon pointer" width="24px" @click="addTodo"/>
        </div>
        
        <div v-if="!todoQuery || todoQuery.length == 0" id="emptyContainer">
          <VImg class="emptyTodo" :src="emptyLogo" width="227px" />
          <p class="sw-large-title sw-text-white emptyTodo">What do you want to do today?</p>
        </div>
        
        <div v-if="todoQuery" id="tasks">
          <taskContainer v-if="incompleteTasks.length > 0" :tasks="incompleteTasks" :title="'Todo'" @update-complete="updateCompleted" @delete-all="deleteAllTodos" @remove-tasks="deleteTodo" />
          <taskContainer v-if="completedTasks.length > 0" :tasks="completedTasks" :title="'Completed'" @update-complete="updateCompleted" @delete-all="deleteAllTodos" @remove-tasks="deleteTodo" />
        </div>
      </div>
  </main>
</template>