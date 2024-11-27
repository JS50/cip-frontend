<script setup>
import placeholder from "@/assets/sw-logo.svg";
import { ref } from "vue";
import axios from '../axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';

let id = 1;
const task = ref("");
const queryClient = useQueryClient();

const fetchTasks = async () => {
  const response = await axios.get('tasks');
  return response.data;
};

const { data: tasks = [], isLoading: tasksLoading, isError: tasksError } = useQuery(
    ['tasks'],
    fetchTasks
);

const addTaskMutation = useMutation({
  mutationFn: async (newTask) => {
    const response = await axios.post('/tasks', {
      task: newTask.task,
      completed: newTask.completed,
    });
    return response.data;
  },
  onSuccess: (data) => {
    console.log('Task added:', data);

    queryClient.invalidateQueries(['tasks']);
  },
  onError: (error) => {
    console.error('Error adding task:', error);
  }
});



const addTask = () => {
  if (task.value.trim().length === 0) return;

  const newTask = {
    task: task.value.trim(),
    completed: false,
  };
  addTaskMutation.mutate(newTask);
  task.value = ''; // Clear input field
};

const deleteTaskMutation = useMutation({
  mutationFn: async (taskId) => {
    const response = await axios.delete(`/tasks/${taskId}`);
    return response.data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries('tasks');
    console.log('Task deleted successfully');
  },
  onError: (error) => {
    console.error('Error deleting task:', error);
  }
});

function removeTask(taskToRemove) {
  deleteTaskMutation.mutate(taskToRemove.id);
}

const updateTaskStatusMutation = useMutation({

  mutationFn: async (updatedTask) => {
    const response = await axios.patch(`/tasks/${updatedTask.id}`, { completed: updatedTask.completed });
    return response.data;
    console.log(updatedTask.task);
  },
  onSuccess: (data) => {
    queryClient.invalidateQueries('tasks');
    console.log('Task updated:', data);
  },
  onError: (error) => {
    console.error('Error updating task:', error);
  }
});

function toggleTaskStatus(taskToToggle) {
  console.log("Before Update:", taskToToggle);

  const updatedTask = {
    ...taskToToggle,
    completed: !taskToToggle.completed, // Toggle the completed status
  };

  console.log("Updated Task:", updatedTask.task);
  tasks.value = tasks.value.map((task) =>
      task.id === taskToToggle.id ? updatedTask : task
  );

  updateTaskStatusMutation.mutate(updatedTask);
}



const deleteAllTasksMutation = useMutation({
  mutationFn: async () => {
    const response = await axios.delete('/tasks');
    return response.data;
  },
  onSuccess: () => {

    queryClient.invalidateQueries('tasks');
    console.log('All tasks deleted');
  },
  onError: (error) => {
    console.error('Error deleting tasks:', error);
  }
});

function deleteAllTasks() {
  deleteAllTasksMutation.mutate(); // Call the mutation to delete all tasks
}
</script>




<template>
  <main class="main-container">
    <!-- Header Section -->
    <div class="header">
      <VImg :src="placeholder" class="placeholder-img" />
      <h1 class="header-text">To-Do</h1>
    </div>

    <!-- Task Input and Buttons -->
    <div class="task-input-container">
      <input
          v-model="task"
          type="text"
          placeholder="Enter Task Here"
          class="task-input"
      />
      <button @click="addTask" class="input-button">Add Task</button>

    </div>

    <!-- Conditional Display for Empty Task List -->
    <p v-if="tasks.length === 0" class="empty-message">
      What would you like to do today?
    </p>

    <!-- Unfinished Tasks -->
    <section v-if="tasks.some(task => !task.completed)">
      <h2>Unfinished Tasks</h2>
      <ul>
        <li v-for="task in tasks.filter(task => !task.completed)" :key="task.id">
          <button @click="toggleTaskStatus(task)" class="mark-finished-btn"></button>
          <span>{{ task.task }}</span>
          <button @click="removeTask(task)">X</button>
        </li>

      </ul>
    </section>

    <!-- Finished Tasks -->
    <section v-if="tasks.some(task => task.completed)">
      <h2>Finished Tasks</h2>
      <ul>
        <li v-for="task in tasks.filter(task => task.completed)" :key="task.id">
          <button
              @click="toggleTaskStatus(task)"
              class="mark-finished-btn"
              :class="{ 'completed': task.completed }">
            <span v-if="task.completed">✔</span>
          </button>

          <span>{{ task.task }}</span>

          <button @click="removeTask(task)">X</button>
        </li>
      </ul>
    </section>
    <button
        v-if="tasks.length > 0"
        @click="deleteAllTasks"
        class="input-button"
    >
      Delete All Tasks
    </button>
  </main>
</template>



<style>
/* Main container styling */
.main-container {
  background-color: black;
  color: white;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
}

/* Header Styling */
.header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
  padding: 10px;
  gap: 5px;
  text-align: left;
}

.placeholder-img {
  width: 40px;
  height: 40px;
}

.header-text {
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-left: -975px;
}

/* Input field styling */
.task-input {
  border: 1px solid white;
  padding: 10px;
  color: white;
  background-color: black;
  width: 70%;
  margin-bottom: 10px;
  border-radius: 8px; /* Rounded corners */
}

/* Button styling for both "Add Task" and "Delete All Tasks" */
.input-button {
  background-color: black;
  color: white;
  border: 1px solid white;
  padding: 10px;
  cursor: pointer;
  border-radius: 8px; /* Rounded corners */
}

.input-button:hover {
  background-color: gray; /* Hover effect */
}

/* Styling for the task list container */
ul {
  list-style-type: none; /* Removes bullets */
  padding: 0; /* Removes default padding */
}

/* Styling for individual tasks */
li {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #444444;
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 8px;
  max-width: 90%;
}


button.mark-finished-btn {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  border: 1px solid white;
  color: white;
  cursor: pointer;
}

button.mark-finished-btn.completed {
  background-color: white;
  color: black;
  border-color: white;
}


button.x-btn {
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
  border-radius: 50%;
}

button.x-btn:hover {
  background-color: #ff5555;
}

</style>

