<script setup lang="ts">

import SimpleImageButton from "@/components/Design/SimpleImageButton.vue";
import {computed, ref} from "vue";

interface DeadlineData {
  deadlineDate: string
}

const props = defineProps<{
  taskData: DeadlineData
}>()

const now = computed(() => {
  const date = new Date();
  //0-16 для формата типа 2018-06-12T19:30
  return date.toISOString().slice(0, 16)
})

const formattedDeadlineDate = computed(() => {
  const date = new Date(props.taskData.deadlineDate)
  console.log(date.toISOString().slice(0, 16))
  return date.toISOString().slice(0, 16)
})
</script>

<template>
  <div class="row task-style">
    <div class="column">
      <div class="row" style="align-items: baseline">
        <label class="task-header-text">Что-то эпическое</label>
        <label class="task-header-text in-row-margin">до</label>
        <input
          class="in-row-margin"
          type="datetime-local"
          :min="now"
          :value="formattedDeadlineDate"
          @keydown.prevent
          disabled
        >
      </div>
      <input type="checkbox" class="checkbox">
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
input[type="datetime-local"] {
  border: 1px solid darkgoldenrod;
  border-radius: 15px;
  font-size: 18px;
  outline: none;
  height: 70px;
}

input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  background-color: darkgoldenrod;
}

input[type="datetime-local"]:disabled {
  border: none;
}

</style>
