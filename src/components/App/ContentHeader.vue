<script setup lang="ts">
</script>

<template>
  <div class="content-header">
    <router-link to="/archive" class="content-button">Посмотреть летопись</router-link>
    <router-link to="/" class="content-button">Выйти</router-link>
  </div>
</template>

<style scoped>
.content-header {
  display: flex;
  justify-content: right;
}

.content-header .content-button {
  margin: 15px;
  width: initial;
}

@media screen and (max-width: 768px) {
  .content-header {
    flex-direction: column;
  }
}
</style>
