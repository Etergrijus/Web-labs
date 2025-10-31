<script setup lang="ts">

import router from "@/router";

const archiveRoute = () => {
  router.push('/archive')
}

const homeRoute = () => {
  router.push('/')
}
</script>

<template>
  <div class="content-header">
    <button class="content-button" @click="archiveRoute">Посмотреть летопись</button>
    <button class="content-button" @click="homeRoute">Выйти</button>
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
