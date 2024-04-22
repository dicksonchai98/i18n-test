<template>
  <div>
    <ul>
      <li><RouterLink to="/">Home</RouterLink></li>

      <li><RouterLink to="/todo">ToDo List</RouterLink></li>
    </ul>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style lang="scss" scoped></style>
