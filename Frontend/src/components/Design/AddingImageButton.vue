<script setup lang="ts">

import {ref} from "vue";

const props = defineProps<{
  imageUrl: string,
  buttonText: string,
  ariaExpanded?: boolean;
}>()

const emits = defineEmits(['click']);

const localButtonRef = ref<HTMLButtonElement | null>(null);

defineExpose({
  buttonRef: localButtonRef,
})
</script>

<template>
  <button
    class="scroll-button"
    ref="localButtonRef"
    type="button"
    @click="$emit('click')"
    :aria-expanded="ariaExpanded"
    :style="{backgroundImage: `url(${imageUrl})`}"
  >
    <span class="scroll-text"
    >
      {{ buttonText }}
    </span>
  </button>
</template>

<style scoped>

.scroll-button {
  /* --- Базовые стили кнопки --- */
  display: inline-flex; /* Для правильного выравнивания текста */
  justify-content: center; /* Центрирование текста по горизонтали */
  align-items: center; /* Центрирование текста по вертикали */
  border: none; /* Убираем стандартную рамку кнопки */
  cursor: pointer; /* Указатель мыши как для кнопки */
  background-repeat: no-repeat; /* Фон не повторяется */
  background-size: 100%, 100%; /* Изображение масштабируется, чтобы поместиться в кнопку, сохраняя пропорции */
  background-position: center center; /* Изображение центрируется */
  transition: transform 0.2s ease; /* Плавный эффект при наведении/клике */

  /* --- Размеры и отступы --- */
  /* Важно: размеры кнопки должны соответствовать вашему изображению свитка,
     или быть немного больше, чтобы текст поместился. */
  /* Например, если ваш свиток 500px шириной и 200px высотой: */
  width: 400px; /* Подберите размер под ваше изображение */
  height: 200px; /* Подберите размер под ваше изображение */
  padding: 0; /* Убираем стандартные отступы, т.к. всё будет в фоне */

  /* --- Текст --- */
  font-size: /*1.2rem*/ 50px; /* Размер шрифта, подберите по вкусу */
  font-weight: bold; /* Жирный шрифт */
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5); /* Легкая тень для текста, чтобы лучше читался на фоне */
  /* Или: text-shadow: 0 0 5px rgba(0,0,0,0.3); */ /* Темная тень, если фон светлый */

  /* --- Позиционирование текста --- */
  position: relative; /* Для позиционирования текста внутри */
  overflow: hidden; /* Обрезать текст, если он выходит за границы */
}

/* --- Стиль для текста, который будет размещен поверх свитка --- */
.scroll-text {
  position: absolute; /* Позиционируем текст абсолютно внутри кнопки */
  top: 50%; /* Центрируем по вертикали */
  left: 50%; /* Центрируем по горизонтали */
  transform: translate(-50%, -50%); /* Точное центрирование */
  text-align: center; /* Выравнивание текста по центру, если он многострочный */
  padding: 10px; /* Небольшой внутренний отступ, чтобы текст не прилипал к краям */
  white-space: nowrap; /* Чтобы текст не переносился, если он короткий */
  /* Можно добавить больше стилей для текста, чтобы он выглядел "нарисованным" */
  font-family: 'Allegreto', serif; /* Пример: шрифт, похожий на рукописный */
  /*  font-style: italic; !* Курсив *!*/
  background: none;
  color: #151719;
}

/* --- Эффекты при наведении и фокусе --- */
.scroll-button:hover .scroll-text {
  color: darkgreen;
}

.scroll-button:active {
  transform: translateY(2px);
}

.scroll-button:focus {
  outline: none; /* Убираем стандартный outline */
}
</style>
