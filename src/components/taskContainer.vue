
<script setup>
import trashIcon from "@/assets/icon-trash.svg";

const props = defineProps({
  tasks: Array,
  title: String,
});

// Define the emitters
const emits = defineEmits(['remove-tasks']);

</script>

<template>
    <div class='taskCategory'>
      <span class="sw-body-base sw-text-white sw-eighty-opacity sw-medium-weight">{{ props.title }}</span>

      <div v-for="todo in props.tasks" class="taskContainer">
        <input type="checkbox" :checked="todo.completed">
        <span class="sw-todo-checkbox" @click="todo.completed = !todo.completed"></span>
        <div id="taskData">
          <p class="sw-body-large sw-text-white sw-eight-opacity">{{ todo.task }}</p>
          <p class="sw-body-base sw-text-grey-4">{{ todo.date.toLocaleString() }}</p>
        </div>
        <span v-if="todo.completed" @click="emits('remove-tasks', todo)" class="deleteTodo"><VImg :src="trashIcon" class="icon pointer deleteIcon" width="30px" /></span>
      </div>

    </div>
</template>