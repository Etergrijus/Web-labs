<script setup lang="ts">

import SimpleImageButton from "../Design/SimpleImageButton.vue";

interface CycleTaskData {
  needfulCount: number,
  doneCount: number,
}

const props = defineProps<{
  taskData: CycleTaskData
}>()

</script>

<template>
  <div class="row task-style">
    <div class="column">
      <div class="row">
        <label class="task-header-text">Что-то эпическое</label>
        <label
          class="task-header-text in-row-margin"
          style="color: #ff2400"
        >
          {{taskData.needfulCount}}
        </label>
        <label class="task-header-text in-row-margin">раз</label>
      </div>
      <input
        type="number"
        :min="props.taskData.doneCount"
        :step="1"
        :max="props.taskData.needfulCount"
        :value="props.taskData.doneCount"
        @keydown.prevent
      >
    </div>

    <div class="task-buttons">
      <SimpleImageButton
        style="margin-bottom: 30px"
        button-text="Редактировать"
        image-url="/img/parchment.png"
        :font_size="36"
        :image_width="250"
        :image_height="100"
      ></SimpleImageButton>

      <SimpleImageButton

        button-text="Отменить"
        image-url="/img/parchment.png"
        :font_size="36"
        :image_width="250"
        :image_height="100"
      ></SimpleImageButton>
    </div>
  </div>
</template>

<style scoped>
input[type="number"] {
  height: 70px;
  border-radius: 15px;
  border: 1px solid darkgoldenrod;
  position: relative;
  text-align: center;
  font-size: 20px;
  font-family: Silkscreen, serif;
  width: 70px;
  outline: none;
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' viewBox='0 0 25 70' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke-width='2'%3E%3C!-- Горизонтальная линия --%3E%3Cline x1='0' x2='25' y1='35' y2='35' stroke='darkgoldenrod'/%3E%3C!-- Верхняя стрелка --%3E%3Cpolyline transform='translate(12.5 25) rotate(45) translate(-12.5 -15)' points='7.5 21.5 7.5 9.5 18.5 9.5' stroke='darkgoldenrod'/%3E%3C!-- Нижняя стрелка --%3E%3Cpolyline transform='translate(12.5 45) rotate(225) translate(-12.5 -40)' points='7.5 47.5 7.5 35.5 18.5 35.5' stroke='darkgoldenrod'/%3E%3C/g%3E%3C/svg%3E");
  background-position: center right;
  background-size: contain;
  background-repeat: no-repeat;
  caret-color: transparent;
  cursor: default;
}

input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  opacity: 1 !important;
  background: transparent !important;
  border-width: 0;
  margin: 0;
  border-left: 1px solid darkgoldenrod;
  height: 70px;
  width: 24px;
  cursor: pointer;
}

</style>
