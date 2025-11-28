<script setup lang="ts">
import {inject, nextTick, onMounted, onUnmounted, type Ref, ref, watch} from "vue";
import router from "@/router";
import {updateTooltipPosition} from "../composables/authFunctions.ts";
import AuthBlock from "@/components/Advanced/AuthBlock.vue";

const login = ref('');
const password = ref('');

const loginError = ref(false);
const passwordError = ref(false);

const loginKeyUp = async () => {
  loginError.value = login.value.trim().length === 0
  if (loginError.value) {
    await nextTick()
    await updateTooltipPosition(loginError.value, loginInputRef.value, loginSpanRef.value)
  }
}

const passwordKeyUp = async () => {
  passwordError.value = password.value.trim().length === 0
  if (passwordError.value) {
    await nextTick()
    await updateTooltipPosition(passwordError.value, passwordInputRef.value, passwordSpanRef.value)
  }
}

//Проверяем форму, чтобы значения были не пустыми
const submitForm = async (event: Event) => {
  event.preventDefault();

  loginError.value = false;
  passwordError.value = false;

  if (login.value.trim().length === 0) {
    loginError.value = true;
    await nextTick()
    await updateTooltipPosition(loginError.value, loginInputRef.value, loginSpanRef.value)
  }

  if (password.value.trim().length === 0) {
    passwordError.value = true;
    await nextTick()
    await updateTooltipPosition(passwordError.value, passwordInputRef.value, passwordSpanRef.value)
  }

  if (!(loginError.value || passwordError.value)) {
    await nextTick()
    await router.push('/content');
  }
}

const loginInputRef = ref<HTMLElement | null>(null);
const loginSpanRef = ref<HTMLElement | null>(null);
const passwordInputRef = ref<HTMLElement | null>(null);
const passwordSpanRef = ref<HTMLElement | null>(null);

//Рефы на аутх-блоки
//Отсюда будем получать рефы на input и span каждого блока
const loginAuthBlockRef = ref<InstanceType<typeof AuthBlock> | null>(null);
const passwordAuthBlockRef = ref<InstanceType<typeof AuthBlock> | null>(null);

watch(loginAuthBlockRef, (newRef) => {
  if (newRef) { // Если экземпляр компонента AuthBlock теперь доступен
    // newRef.inputRef - это экспортированный ref из AuthBlock
    loginInputRef.value = newRef.inputRef; // Присваиваем его к нашему рефу в родителе
    loginSpanRef.value = newRef.spanRef;   // То же самое для span
  }
});
watch(passwordAuthBlockRef, (newRef) => {
  if (newRef) {
    passwordInputRef.value = newRef.inputRef;
    passwordSpanRef.value = newRef.spanRef;
  }
});

onMounted(() => {
  window.addEventListener('resize', () => {
    updateTooltipPosition(loginError.value, loginInputRef.value, loginSpanRef.value)
  });
  window.addEventListener('resize', () => {
    updateTooltipPosition(passwordError.value, passwordInputRef.value, passwordSpanRef.value)
  });
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    updateTooltipPosition(loginError.value, loginInputRef.value, loginSpanRef.value)
  });
  window.removeEventListener('resize', () => {
    updateTooltipPosition(passwordError.value, passwordInputRef.value, passwordSpanRef.value)
  });
})
</script>

<template>
  <div class="auth-text-header">
    <h1 class="welcome-text">Да-да, проходите </h1>
  </div>

  <div class="auth-block">
    <form action="/login" method="post" @submit="submitForm">
      <AuthBlock
        id="login"
        type="text"
        label_text="Имя пользователя:"
        v-model="login"
        :span_show="loginError"
        span_text="Введите имя пользователя"
        ref="loginAuthBlockRef"
        @input-key-up="loginKeyUp"
      >
      </AuthBlock>


      <AuthBlock
        id="password"
        type="password"
        label_text="Пароль:"
        v-model="password"
        :span_show="passwordError"
        span_text="Введите пароль"
        ref="passwordAuthBlockRef"
        @input-key-up="passwordKeyUp"
      >
      </AuthBlock>
      <button
        type="submit"
        class="default-button"
      >
        Войти
      </button>
    </form>
    <router-link to="/" class="default-button">Обратно</router-link>
  </div>
</template>

<style scoped>

</style>
