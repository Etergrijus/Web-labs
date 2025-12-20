<script setup lang="ts">
import {nextTick, onMounted, onUnmounted, ref, watch} from "vue";
import router from "../router";
import {updateTooltipPosition} from "../composables/authFunctions";
import AuthBlock from "../components/Advanced/AuthBlock.vue";
import api from "../services/api"

const login = ref('');
const password = ref('');

const loginError = ref(false);
const passwordError = ref(false);

const loginErrorText = ref("");
const passwordErrorText = ref("");

const loginKeyUp = async () => {
  loginError.value = login.value.trim().length === 0
  if (loginError.value) {
    loginErrorText.value = "Введите имя пользователя"
    await nextTick()
    await updateTooltipPosition(loginError.value, loginInputRef.value, loginSpanRef.value)
  }
}

const passwordKeyUp = async () => {
  passwordError.value = password.value.trim().length === 0
  if (passwordError.value) {
    passwordErrorText.value = "Введите пароль"
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
    loginErrorText.value = "Введите имя пользователя"
    await nextTick()
    await updateTooltipPosition(loginError.value, loginInputRef.value, loginSpanRef.value)
  }

  if (password.value.trim().length === 0) {
    passwordError.value = true;
    passwordErrorText.value = "Введите пароль"
    await nextTick()
    await updateTooltipPosition(passwordError.value, passwordInputRef.value, passwordSpanRef.value)
  }

/*  if (!(loginError.value || passwordError.value)) {
    await nextTick()
    await router.push('/content');
  }*/
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

const resetErrors = () => {
  loginError.value = false
  passwordError.value = false

  loginErrorText.value = "";
  passwordErrorText.value = "";
};

const loginRequest = async () => {
  resetErrors()

  try {
    const response = await api.post('/login', {
      username: login.value,
      password: password.value,
    })
    console.log("Ответ:", response.data)

    const char_id = response.data.char_id
    console.log('Полученный char_id:', char_id)
    await router.push({
      name: `content`,
      query: {id: char_id},
      params: {id: char_id}
  });
  } catch (error) {
    console.error("Ошибка соединения с бэкендом:", error);

    if (error.response) {
      const status = error.response.status;
      const errorData = error.response.data;
      const errorMessage = errorData.error;

      switch (status) {
        case 401:
          if (errorMessage === "Incorrect Password") {
            passwordError.value = true
            passwordErrorText.value = "Неверный пароль"
          }
          break;
        case 404:
          if (errorMessage === "User not found") {
            loginError.value = true
            loginErrorText.value = "Пользователь не найден"
          }
        case 400:
          break;
        default:
          // Неожиданный код ошибки
          loginError.value = true
          loginErrorText.value = `Ошибка ${status}: Не удалось войти.`;
          break;
      }
    } else if (error.request) {
      // Запрос был сделан, но ответ не получен (например, CORS, если бы он был проблемой,
      // или бэкенд был недоступен)
      loginError.value = true
      loginErrorText.value = 'Нет ответа от сервера. Проверьте доступность бэкенда.';
    } else {
      // Что-то пошло не так при настройке запроса
      loginError.value = true
      loginErrorText.value = 'Ошибка при отправке запроса.';
    }
  }
}
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
        :span_text="loginErrorText"
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
        :span_text="passwordErrorText"
        ref="passwordAuthBlockRef"
        @input-key-up="passwordKeyUp"
      >
      </AuthBlock>
      <button
        type="submit"
        class="default-button"
        @click="loginRequest"
      >
        Войти
      </button>
    </form>
    <router-link to="/" class="default-button">Обратно</router-link>
  </div>
</template>

<style scoped>

</style>
