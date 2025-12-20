<script setup lang="ts">

import SimpleImageButton from "../Design/SimpleImageButton.vue";
import {computed, ref} from "vue";

interface MonotonousTaskData {
  needfulCount: number,
  doneCount: number,
  periodValue: number,
  periodMeasureUnit: string
}

const props = defineProps<{
  taskData: MonotonousTaskData
  index: number,
  id: number,
}>()

const emit = defineEmits(['remove'])

const handleRemove = () => {
  emit('remove', props.index)
}

const needful = ref(props.taskData.needfulCount)
const done = ref(props.taskData.doneCount)
const periodValue = ref(props.taskData.periodValue)
const periodMeasureUnit = ref(props.taskData.periodMeasureUnit)

const editButtonText = ref("Редактировать")
const taskTitle = ref("Что-то эпическое")
const isEdit = ref(false)
const editing = () => {
  const titleLabel = document.getElementById('task_title' + props.id)
  if (isEdit.value === false) {
    editButtonText.value = "Сохранить"
    isEdit.value = true
    titleLabel.contentEditable = String(true);
  } else if (isEdit.value === true) {
    editButtonText.value = "Редактировать"
    isEdit.value = false
    titleLabel.contentEditable = String(false);
  }
}

const getPeriodMeasureUnit = computed(() => {
  switch (periodMeasureUnit.value) {
    case "minute":
      return "Минута"
    case "hour":
      return "Час"
    case "day":
      return "День"
    case "week":
      return "Неделя"
    case "month":
      return "Месяц"
    case "year":
      return "Год"
  }
})

</script>

<template>
  <div class="row task-style">
    <div class="column" style="width: 700px">
      <div class="row" style="align-items: baseline">
        <label
          class="task-header-text"
          :id="'task_title' + id"
        >
          {{ taskTitle }}
        </label>

        <label
          class="task-header-text in-row-margin"
          style="color: #ff2400"
          v-if="!isEdit"
        >
          {{ needful }}
        </label>
        <input
          v-else
          type="number"
          v-model.number="needful"
          :min="1"
          :max="100"
          @keydown.prevent
        >

        <label class="task-header-text in-row-margin">раз в</label>

        <label
          class="task-header-text in-row-margin"
          style="color: #ff2400"
          v-if="!isEdit"
        >
          {{ periodValue }}
        </label>
        <input
          v-else
          type="number"
          v-model.number="periodValue"
          :min="1"
          :max="100"
          @keydown.prevent
        >

        <label
          class="task-header-text in-row-margin"
          style="color: #ff2400"
          v-if="!isEdit"
        >
          {{getPeriodMeasureUnit}}
        </label>

        <select
          v-model="periodMeasureUnit"
          name="periods"
          class="in-row-margin"
          style="color: #ff2400"
          v-else
        >
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
          v-for="n in needful"
          :key="'checkbox' + n">
      </div>
    </div>

    <div class="task-buttons">
      <SimpleImageButton
        :id="'task_title' + id"
        style="margin-bottom: 30px"
        :button-text="editButtonText"
        image-url="/img/parchment.png"
        :font_size="36"
        :image_width="250"
        :image_height="100"
        @click="editing"
      ></SimpleImageButton>

      <SimpleImageButton

        button-text="Отменить"
        image-url="/img/parchment.png"
        :font_size="36"
        :image_width="250"
        :image_height="100"
        @click="handleRemove"
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
  padding: 10px;
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
