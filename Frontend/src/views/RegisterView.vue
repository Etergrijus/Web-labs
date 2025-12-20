<script setup lang="ts">
import {nextTick, onMounted, onUnmounted, ref, watch} from "vue";
import router from "../router";
import {updateTooltipPosition} from "../composables/authFunctions";
import AuthBlock from "../components/Advanced/AuthBlock.vue";
import api from "../services/api"


const login = ref('');
const password = ref('');
const checkerPassword = ref('');
const charName = ref('');

const loginError = ref(false);
const passwordError = ref(false);
const checkerPasswordError = ref(false);
const charNameError = ref(false);

const loginErrorText = ref("");
const passwordErrorText = ref("");
const checkerPasswordErrorText = ref("");
const charNameErrorText = ref("");

const loginInputRef = ref<HTMLElement | null>(null);
const loginSpanRef = ref<HTMLElement | null>(null);
const passwordInputRef = ref<HTMLElement | null>(null);
const passwordSpanRef = ref<HTMLElement | null>(null);
const checkerPasswordInputRef = ref<HTMLElement | null>(null);
const checkerPasswordSpanRef = ref<HTMLElement | null>(null);
const charNameInputRef = ref<HTMLElement | null>(null);
const charNameSpanRef = ref<HTMLElement | null>(null);

onMounted(() => {
  window.addEventListener('resize', () => {
    updateTooltipPosition(loginError.value, loginInputRef.value, loginSpanRef.value)
  });
  window.addEventListener('resize', () => {
    updateTooltipPosition(passwordError.value, passwordInputRef.value, passwordSpanRef.value)
  });
  window.addEventListener('resize', () => {
    updateTooltipPosition(checkerPasswordError.value, checkerPasswordInputRef.value,
      checkerPasswordSpanRef.value)
  });
  window.addEventListener('resize', () => {
    updateTooltipPosition(charNameError.value, charNameInputRef.value, charNameSpanRef.value)
  });
})

const errors = [loginError,
  passwordError,
  checkerPasswordError,
  charNameError
];

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
  checkerPasswordError.value = password.value != checkerPassword.value
  if (checkerPasswordError.value) {
    checkerPasswordErrorText.value = "Пароли не совпадают"
    await nextTick()
    await updateTooltipPosition(
      checkerPasswordError.value,
      checkerPasswordInputRef.value,
      checkerPasswordSpanRef.value
    )
  }
}

const checkerPasswordKeyUp = async () => {
  checkerPasswordError.value = checkerPassword.value != password.value
  if (checkerPasswordError.value) {
    checkerPasswordErrorText.value = "Пароли не совпадают"
    await nextTick()
    await updateTooltipPosition(
      checkerPasswordError.value,
      checkerPasswordInputRef.value,
      checkerPasswordSpanRef.value
    )
  }
}

const charNameKeyUp = async () => {
  charNameError.value = charName.value.trim().length === 0
  if (charNameError.value) {
    charNameErrorText.value = "Введите имя персонажа"
    await nextTick()
    await updateTooltipPosition(
      charNameError.value,
      charNameInputRef.value,
      charNameSpanRef.value
    )
  }
}

const submitForm = async (event: Event) => {
  event.preventDefault();

  for (let error of errors) {
    error.value = false;
  }

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

  if (checkerPassword.value != password.value) {
    checkerPasswordError.value = true;
    checkerPasswordErrorText.value = "Пароли не совпадают"
    await nextTick()
    await updateTooltipPosition(
      checkerPasswordError.value,
      checkerPasswordInputRef.value,
      checkerPasswordSpanRef.value
    )
  }

  if (charName.value.trim().length === 0) {
    charNameError.value = true;
    charNameErrorText.value = "Введите имя персонажа"
    await nextTick()
    await updateTooltipPosition(charNameError.value, charNameInputRef.value, charNameSpanRef.value)
  }

  for (let error of errors) {
    if (error.value == true)
      return;
  }

  await nextTick()
}

//Рефы на аутх-блоки
//Отсюда будем получать рефы на input и span каждого блока
const loginAuthBlockRef = ref<InstanceType<typeof AuthBlock> | null>(null);
watch(loginAuthBlockRef, (newRef) => {
  if (newRef) { // Если экземпляр компонента AuthBlock теперь доступен
    // newRef.inputRef - это экспортированный ref из AuthBlock
    loginInputRef.value = newRef.inputRef; // Присваиваем его к нашему рефу в родителе
    loginSpanRef.value = newRef.spanRef;   // То же самое для span
  }
});

const passwordAuthBlockRef = ref<InstanceType<typeof AuthBlock> | null>(null);
watch(passwordAuthBlockRef, (newRef) => {
  if (newRef) {
    passwordInputRef.value = newRef.inputRef;
    passwordSpanRef.value = newRef.spanRef;
  }
});
const checkerPasswordAuthBlockRef = ref<InstanceType<typeof AuthBlock> | null>(null);
watch(checkerPasswordAuthBlockRef, (newRef) => {
  if (newRef) {
    checkerPasswordInputRef.value = newRef.inputRef;
    checkerPasswordSpanRef.value = newRef.spanRef;
  }
});
const charNameAuthBlockRef = ref<InstanceType<typeof AuthBlock> | null>(null);
watch(charNameAuthBlockRef, (newRef) => {
  if (newRef) {
    charNameInputRef.value = newRef.inputRef;
    charNameSpanRef.value = newRef.spanRef;
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    updateTooltipPosition(loginError.value, loginInputRef.value, loginSpanRef.value)
  });
  window.removeEventListener('resize', () => {
    updateTooltipPosition(passwordError.value, passwordInputRef.value, passwordSpanRef.value)
  });
  window.removeEventListener('resize', () => {
    updateTooltipPosition(checkerPasswordError.value, checkerPasswordInputRef.value,
      checkerPasswordSpanRef.value)
  });
  window.removeEventListener('resize', () => {
    updateTooltipPosition(charNameError.value, charNameInputRef.value, charNameSpanRef.value)
  });
})

const resetErrors = () => {
  loginError.value = false
  passwordError.value = false
  checkerPasswordError.value = false
  charNameError.value = false

  loginErrorText.value = "";
  passwordErrorText.value = "";
  checkerPasswordErrorText.value = "";
  charNameErrorText.value = "";
};

const registerRequest = async () => {
  resetErrors()

  try {
    const response = await api.post('/register', {
      username: login.value,
      password: password.value,
      char_name: charName.value
    })
    console.log("Ответ:", response.data)
    await router.push('/content');
  } catch (error) {
    console.error("Ошибка соединения с бэкендом:", error);

    if (error.response) {
      const status = error.response.status;
      const errorData = error.response.data;
      const errorMessage = errorData.error;

      switch (status) {
        case 400:
          if (errorMessage === 'Password too short') {
            passwordError.value = true
            passwordErrorText.value = "Пароль слишком короткий";
          } else if (errorMessage === 'Username too long') {
            loginError.value = true
            loginErrorText.value = "Логин слишком длинный";
          } else if (errorMessage === 'char_name too long') {
            charNameError.value = true
            charNameErrorText.value = "Имя персонажа слишком длинное";
          }/* else {
              // Общая ошибка 400 (например, "Missing required fields")
              loginErrorText.value = errorMessage;*/
          break;
        case 409:
          if (errorMessage === 'User already exists') {
            loginError.value = true
            loginErrorText.value = "Такой пользователь уже существует";
          }
          break;
        case 500:
          // Internal server error
          loginError.value = true
          loginErrorText.value = 'Произошла внутренняя ошибка сервера.';
          break;
        default:
          // Неожиданный код ошибки
          loginError.value = true
          loginErrorText.value = `Ошибка ${status}: Не удалось зарегистрироваться.`;
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
    <h1 class="welcome-text">Дальше вы не пройдёте,<br> пока не заполните бумаги</h1>
  </div>

  <div class="auth-block">
    <form
      action="/login"
      method="post"
      @submit="submitForm"
    >
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

      <AuthBlock
        id="password-check"
        type="password"
        label_text="Подтвердите пароль:"
        v-model="checkerPassword"
        :span_show="checkerPasswordError"
        :span_text="checkerPasswordErrorText"
        ref="checkerPasswordAuthBlockRef"
        @input-key-up="checkerPasswordKeyUp"
      >
      </AuthBlock>

      <AuthBlock
        id="char-name"
        type="text"
        :label_text="`Введите имя персонажа:<br>
        <em><sub> (В диапазоне от вашего ФИО до &quot;Мы, император и самодержец&quot;)</sub></em>`"
        v-model="charName"
        :span_show="charNameError"
        :span_text="charNameErrorText"
        ref="charNameAuthBlockRef"
        @input-key-up="charNameKeyUp"
      >
      </AuthBlock>

      <button
        type="submit"
        class="default-button"
        @click="registerRequest"
      >
        Зарегистрироваться
      </button>
    </form>
    <router-link to="/" class="default-button">Обратно</router-link>
  </div>
</template>

<style scoped>

</style>
