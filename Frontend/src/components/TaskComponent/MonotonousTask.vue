<script setup lang="ts">

import SimpleImageButton from "../Design/SimpleImageButton.vue";

interface MonotonousTaskData {
  needfulCount: number,
  doneCount: number,
  periodValue: number,
  periodMeasureUnit: string
}

const props = defineProps<{
  taskData: MonotonousTaskData
}>()
</script>

<template>
  <div class="row task-style">
    <div class="column">
      <div class="row" style="align-items: baseline">
        <label class="task-header-text">Что-то эпическое</label>
        <label
          class="task-header-text in-row-margin"
          style="color: #ff2400"
        >
          {{ taskData.needfulCount }}
        </label>
        <label class="task-header-text in-row-margin">раз в</label>
        <label
          class="task-header-text in-row-margin"
          style="color: #ff2400"
        >
          {{ taskData.periodValue }}
        </label>
        <select v-model="taskData.periodMeasureUnit" name="periods" class="in-row-margin" disabled>
          <option value="minute">Минута</option>
          <option value="hour">Час</option>
          <option value="day">День</option>
          <option value="week">Неделя</option>
          <option value="month">Месяц</option>
          <option value="year">Год</option>
        </select>
      </div>

      <div class="row flex_wrap">
        <input
          type="checkbox"
          class="checkbox"
          v-for="n in taskData.needfulCount"
          :key="'checkbox' + n">
      </div>
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
.flex_wrap {
  /*Перенос*/
  flex-wrap: wrap;
}

select {
  font-size: 24px;
  font-family: Silkscreen, serif;
  border: 2px solid darkgoldenrod;
  border-radius: 15px;
  outline: none;
  color: white; /* Белый текст по умолчанию */
}

select:disabled {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  background-color: #151719;
  color: white;
  opacity: 0.9;
}
</style>
