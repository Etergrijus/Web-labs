<script setup lang="ts">
import {ref} from "vue";
import router from "@/router";

const login = ref('');
const password = ref('');

const loginError = ref(false);
const passwordError = ref(false);

const submitForm = (event) => {
  event.preventDefault();

  loginError.value = false;
  passwordError.value = false;

  if (login.value.trim().length === 0) {
    loginError.value = true;
  }

  if (password.value.trim().length === 0) {
    passwordError.value = true;
  }

  if (!(loginError.value || passwordError.value)) {
    router.push('/content');
  }
}
</script>

<template>
  <div class="auth-text-header">
    <h1 class="welcome-text">Да-да, проходите </h1>
  </div>

  <div class="auth-block">
    <form action="/login" method="post" @submit="submitForm">
      <div class="input-container">
        <label for="username" class="edit-label">Имя пользователя:</label>
        <input type="text" id="username" name="username" class="edit-input"
               v-model="login">
        <span v-if="loginError" class="tooltip"> Введите имя пользователя</span>
      </div>

      <div class="input-container">
        <label for="password" class="edit-label">Пароль:</label>
        <input type="password" id="password" name="password" class="edit-input"
               v-model="password">
        <span v-if="passwordError" class="tooltip"> Введите пароль</span>
      </div>
      <button type="submit" class="default-button"> Войти</button>
    </form>
    <router-link to="/" class="default-button">Обратно</router-link>
  </div>
</template>

<style scoped>

</style>
