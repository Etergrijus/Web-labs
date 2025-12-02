<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  imageUrl: string,
  buttonText: string,
  font_family?: string,
  font_size?: number,
  font_color?: string,
  top_?: number,
  left_?: number,
  image_width?: number,
  image_height?: number,
}>()

const emits = defineEmits(['click']);

const dynamicButtonStyles = computed(() => {
  const styles: Record<string, string | number | undefined> = {
    backgroundImage: `url(${props.imageUrl})`,
    fontSize: '28px',
    width: '400px',
    height: '200px',
    backgroundSize: '100% 100%'
  };

  if (props.font_size !== undefined) {
    styles.fontSize = `${props.font_size}px`
  }

  if (props.image_width !== undefined) {
    styles.width = `${props.image_width}px`
  }

  if (props.image_height !== undefined) {
    styles.height = `${props.image_height}px`
  }

  return styles
})

const dynamicTextStyle = computed(() => {
  const styles: Record<string, string | number | undefined> = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: '\'Allegreto\', serif',
    color: '#000',
  }

  if (props.font_family !== undefined) {
    styles.fontFamily = `\'${props.font_family}\', Serif`
  }

  if (props.font_color !== undefined) {
    styles.color = `${props.font_color}`
  }

  if (props.top_ !== undefined) {
    styles.top = `${props.top_}%`
  }

  if (props.left_ !== undefined) {
    styles.left = `${props.left_}%`
  }

  return styles
})
</script>

<template>
  <div>
    <button
      class="scroll-button"
      type="button"
      @click="$emit('click')"
      :style="dynamicButtonStyles"
    >
    <span
      class="scroll-text"
      :style="dynamicTextStyle"
    >
      {{ buttonText }}
    </span>
    </button>
  </div>
</template>

<style scoped>
.scroll-button {
  /* --- Базовые стили кнопки --- */
  display: inline-flex; /* Для правильного выравнивания текста */
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  background-repeat: no-repeat; /* Фон не повторяется */
  /*background-size: contain; !* Изображение масштабируется, чтобы поместиться в кнопку, сохраняя пропорции *!*/
  background-position: center center; /* Изображение центрируется */
  transition: transform 0.2s ease; /* Плавный эффект при наведении/клике */
  padding: 0;

  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);

  /* --- Позиционирование текста --- */
  position: relative;
  overflow: hidden; /* Обрезать текст, если он выходит за границы */

  /*Чтобы при зажатии кнопки и перемещении мыши ссылка не тянулась с нами */
  -webkit-user-drag: none;
}

.scroll-button:active {
  transform: translateY(2px);
}

.scroll-button:focus {
  outline: none; /* Убираем стандартный outline */
}

.scroll-text {
  text-align: center;
  padding: 10px;
  white-space: nowrap;
  background: none;
}
</style>
