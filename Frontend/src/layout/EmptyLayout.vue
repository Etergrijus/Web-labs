<script setup lang="ts">
import {onMounted, onBeforeUnmount} from "vue";

onMounted(() => {
  const appElement = document.getElementById('app')
  if (appElement)
    appElement.classList.add('empty-layout');
});

onBeforeUnmount(() => {
  const appElement = document.getElementById('app');
  if (appElement) {
    appElement.classList.remove('empty-layout');
  }
});
</script>

<template>
  <main>
    <router-view/>
  </main>
</template>

<style>
.auth-text-header .welcome-text {
  font-size: 48px;
  text-align: center;
}

.auth-block {
  width: 500px;
  margin: 0 auto;
  padding: 20px;
}

@media screen and (max-width: 500px) {
  .auth-block {
    width: 250px;
  }
}
</style>
