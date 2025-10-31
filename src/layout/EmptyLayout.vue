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

.edit-label {
  display: block;
  margin-bottom: 10px;
}

.edit-input {
  width: 100%;
  padding: 8px;
  border-style: dot-dash;
  border-color: lightgray;
  box-sizing: border-box;
  margin-bottom: 20px;

  font-family: Arial serif;
  font-size: 20px;
}

@media screen and (max-width: 500px) {
  .auth-block {
    width: 250px;
  }
}

.input-container {
  position: relative;
}

.tooltip {
  position: absolute;
  top: 50%;
  left: calc(100% + 12px); /* Сбоку справа от input */
  transform: translateY(-50%); /* Центрируем вертикально */
  background-color: #f44336;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.9em;
  white-space: nowrap; /* Не переносить текст */
  z-index: 10; /* Над другими элементами */
  opacity: 0.9; /* Лёгкая прозрачность */
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 100%;
  transform: translateY(-50%);
  border: 6px solid transparent;
  border-right-color: #f44336;
}
</style>
