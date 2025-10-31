<script setup lang="ts">

import Heart from "@/components/Drawnings/Heart.vue";
import Star from "@/components/Drawnings/Star.vue";
import Lightning from "@/components/Drawnings/Lightning.vue";
import GearWheel from "@/components/Drawnings/GearWheel.vue";
import {ref} from "vue";
import {useFileDialog} from "@vueuse/core";

const imageSrc = ref('/img/empty_photo.jpg'); // Реактивная переменная для src

const {files, open, reset, onCancel, onChange} = useFileDialog ({
  accept: 'image/*', // Set to accept only image files
  directory: false, // Select directories instead of files if set true
})

onChange(() => {
  if (files.value && files.value.length > 0) {
    const file = files.value[0];
    imageSrc.value = URL.createObjectURL(file);
  }
})

</script>

<template>
<div class="char-block">
    <h1 style="margin-top: 40px">Тут будет ваше имя</h1>
    <img :src="imageSrc" width="400px">
    <button class="content-button" type="button" @click="open">Сменить фото</button>
    <h2>Мои характеристики</h2>
    <div class="characteristics-container">
      <Heart/>
      <Lightning/>
      <Star/>
      <GearWheel/>
    </div>
  </div>
</template>

<style scoped>
.char-block {
  display: flex;
  flex-direction: column;
  width: calc(33% - 1px);

  align-items: center;
  padding: 15px;
}

.char-block .content-button {
  margin-top: 30px;
}

.characteristics-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  gap: 50px;
  margin-left: 50px;

   flex-wrap: wrap;  /* Перенос на новую строку, если не помещаются */
  box-sizing: border-box;  /* Учитываем padding/margin в ширине */
}

/* Стили для самих SVG-компонентов (предполагаем, что они рендерят <svg>) */
.characteristics-container svg {
  flex: 1;  /* Равномерное распределение ширины между SVG */
/*  max-width: 100%;  !* Максимальная ширина — 100% от контейнера, чтобы не выходили за границы *!*/
  height: auto;  /* Автоматическая высота для сохранения пропорций */
  min-width: 50px;  /* Минимальная ширина, чтобы не сжимались слишком сильно (настрой под нужды) */
  max-width: 100px;
}

@media screen and (max-width: 768px) {
  .char-block {
    width: calc(100%);
  }

  .characteristics-container {
    flex-direction: column;
    gap: 5px;
    width: 50%;
    align-items: start;
  }
}

@media screen and (max-width: 500px) {
  .char-block img {
    width: 200px;
  }
}
</style>
