<script setup lang="ts">
import {ref} from "vue";
import router from "@/router";

const login = ref('');
const password = ref('');
const checkerPassword = ref('');
const charName = ref('');

const loginError = ref(false);
const passwordError = ref(false);
const checkerPasswordError = ref(false);
const charNameError = ref(false);

const errors = [loginError,
  passwordError,
  checkerPasswordError,
  charNameError
];

const submitForm = (event) => {
  event.preventDefault();

  for (let error of errors) {
    error.value = false;
  }

  if (login.value.trim().length === 0) {
    loginError.value = true;
    console.log('loginError');
  }

  if (password.value.trim().length === 0) {
    passwordError.value = true;
    console.log('passwordError');
  }

  if (checkerPassword.value != password.value) {
    checkerPasswordError.value = true;
    console.log('checkerPasswordError');
  }

  if (charName.value.trim().length === 0) {
    charNameError.value = true;
    console.log('charNameError');
  }

  for (let error of errors) {
    if (error.value == true)
      return;
  }

  router.push('/content');
}
</script>

<template>
  <div class="auth-text-header">
    <h1 class="welcome-text">Дальше вы не пройдёте,<br> пока не заполните бумаги</h1>
  </div>

  <div class="auth-block">
    <form action="/login" method="post" @submit="submitForm">
      <div class="input-container">
        <label for="username" class="edit-label">Имя пользователя:</label>
        <input type="text" id="username" name="username" class="edit-input"
               v-model="login">
        <span v-if="loginError" class="tooltip">Введите имя пользователя</span>
      </div>

      <div class="input-container">
        <label for="password" class="edit-label">Пароль:</label>
        <input type="password" id="password" name="password" class="edit-input"
               v-model="password">
        <span v-if="passwordError" class="tooltip">Введите пароль</span>
      </div>

      <div class="input-container">
        <label for="password-check" class="edit-label">Подтвердите пароль:</label>
        <input type="password" id="password-check" name="password-check"
               class="edit-input" v-model="checkerPassword">
        <span v-if="checkerPasswordError" class="tooltip">Пароли не совпадают</span>
      </div>

      <div class="input-container">
        <label for="char-name" class="edit-label">Введите имя персонажа:<br>
          <em><sub>(В диапазоне от вашего ФИО до "Мы, император и самодержец")</sub></em></label>
        <input type="text" id="char-name" name="char-name" class="edit-input" v-model="charName">
        <span v-if="charNameError" class="tooltip">Введите имя персонажа</span>
      </div>

      <button type="submit" class="default-button">Зарегистрироваться</button>
    </form>
    <router-link to="/" class="default-button">Обратно</router-link>
  </div>
</template>

<style scoped>

</style>
