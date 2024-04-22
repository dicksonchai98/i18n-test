l
<template>
  <div>
    <label>Language:</label>

    <select v-model="$i18n.locale">
      <option>EN</option>
      <option>CH</option>
    </select>
    <h1>{{ $t('title') }}</h1>

    <select v-model="sortOrder" @change="sortTasks">
      <option value="default">Default</option>
      <option value="a-z">Name (A-Z)</option>
      <option value="z-a">Name (Z-A)</option>
    </select>

    <input v-model="newTask" @keyup.enter="addTask" placeholder="Add a new task" />

    <ul>
      <li v-for="task in sortedTasks" :key="task.id">
        <input type="checkbox" v-model="task.completed" @change="updateTaskStatus(task.id)" />
        <span :class="{ completed: task.completed }">{{ task.name }}</span>
        <button @click="editTask(task)">{{ $t('edit') }}</button>
        <button @click="deleteTask(task.id)">{{ $t('delete') }}</button>
      </li>
    </ul>

    <div>
      <button @click="filterTasks('all')">{{ $t('all') }}</button>
      <button @click="filterTasks('completed')">{{ $t('completed') }}</button>
      <button @click="filterTasks('active')">{{ $t('active') }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// todo的list的假資料，測試用
const tasks = ref([
  { id: 1, name: 'Task 1', completed: false },
  { id: 2, name: 'Task 2', completed: true }
])
const filter = ref('all')
const newTask = ref('')
// 新增todo,宣告newtask以綁定input得到的值，點擊addtask把input的值推到tasks裏面
const addTask = () => {
  if (newTask.value.trim() !== '') {
    tasks.value.push({ id: tasks.value.length + 1, name: newTask.value, completed: false })
    newTask.value = ''
  }
}
// 刪除todo,在用戶點擊按鈕，帶入當下的todoid作爲參數做刪除
const deleteTask = (taskId) => {
  tasks.value = tasks.value.filter((task) => task.id !== taskId)
}
// 編輯todo,帶入參數找到相應的todo做編輯，根據promt用戶回傳的值去做判斷
const editTask = (task) => {
  const newName = prompt('Edit task:', task.name)
  if (newName !== null) {
    task.name = newName
  }
}
// todo綁定completed,如果checkbox被點擊,則透過改變style的方式去劃掉todo
const updateTaskStatus = (task) => {
  task.completed = !task.completed
}
// 篩選todo狀態
const filterTasks = (status) => {
  filter.value = status
}
// 去讀取filter的value的狀態去return相應的值
const filteredTasks = computed(() => {
  if (filter.value === 'all') {
    return tasks.value
  } else if (filter.value === 'completed') {
    return tasks.value.filter((task) => task.completed)
  } else if (filter.value === 'active') {
    return tasks.value.filter((task) => !task.completed)
  }
})
// 綁定排序方式
const sortOrder = ref('default')
// 根據綁定sortorder的值，去改變順序排序
const sortedTasks = computed(() => {
  let sorted = [...filteredTasks.value]

  if (sortOrder.value === 'a-z') {
    sorted.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortOrder.value === 'z-a') {
    sorted.sort((a, b) => b.name.localeCompare(a.name))
  }

  return sorted
})

const sortTasks = () => {
  // Trigger reactivity by changing sortOrder value
  sortOrder.value = sortOrder.value
}
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
ul li {
  list-style: none;
  display: flex;
}
</style>
