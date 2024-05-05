
<script setup>
import trashIcon from "@/assets/icon-trash.svg";

const props = defineProps({
  tasks: Array,
  title: String,
});

// Define the emitters
const emits = defineEmits(['remove-tasks', 'update-complete', 'delete-all']);

</script>

<template>
    <div class='taskCategory'>
      <div style="margin-bottom: 5px;">
        <span class="sw-body-base sw-text-white sw-eighty-opacity sw-medium-weight">{{ props.title }}</span>
        <button @click="emits('delete-all', props.tasks)" class='sw-small-caption sw-text-white deleteButton'>Delete All</button>
      </div>
      <div v-for="todo in props.tasks" class="taskContainer">
        <input type="checkbox" :checked="todo.completed">
        <span class="sw-todo-checkbox" @click="emits('update-complete', todo)"></span>
        <div id="taskData">
          <p class="sw-body-large sw-text-white sw-eight-opacity">{{ todo.task }}</p>
          <p class="sw-body-base sw-text-grey-4">{{ new Date(todo.created_at).toLocaleString() }}</p>
        </div>
        <span @click="emits('remove-tasks', todo)" class="deleteTodo"><VImg :src="trashIcon" class="icon pointer deleteIcon" width="30px" /></span>
      </div>

    </div>
</template>