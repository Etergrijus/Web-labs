<script setup lang="ts">

import SimpleImageButton from "../Design/SimpleImageButton.vue";
import {computed, ref} from "vue";

interface DeadlineData {
  deadlineDate: string
}

const props = defineProps<{
  taskData: DeadlineData
  index: number,
  id: number,
}>()

const emit = defineEmits(['remove'])

const handleRemove = () => {
  emit('remove', props.index)
}

const now = computed(() => {
  const date = new Date();
  //0-16 для формата типа 2018-06-12T19:30
  return date.toISOString().slice(0, 16)
})

const deadlineDate = ref(props.taskData.deadlineDate)

const formattedDateForInput = computed(() => {
  if (!deadlineDate.value) return '';

  const date = new Date(deadlineDate.value);
  // Проверяем, если дата валидна
  if (isNaN(date.getTime())) {
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0'); // Локальные часы
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // Формат, который ожидает input datetime-local
  return `${year}-${month}-${day}T${hours}:${minutes}`;
});

const localeDeadlineDate = computed(() => {
  const date = new Date(deadlineDate.value)
  return date.toLocaleString().replace(",", "").slice(0, 16)
})

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

const handleDateInput = (event) => {
  const newDate = event.target.value;
  const date = new Date(newDate);
  if (date < new Date())
    return

  deadlineDate.value = date.toISOString();
};

</script>

<template>
  <div class="row task-style">
    <div class="column" style="width: 700px">
      <div class="row" style="align-items: baseline">
        <label
          :id="'task_title' + id"
          class="task-header-text"
        >
          {{ taskTitle }}
        </label>
        <label class="task-header-text in-row-margin">до</label>

        <label
          class="task-header-text in-row-margin"
          style="color: #ff2400"
          v-if="!isEdit"
        >
          {{ localeDeadlineDate }}
        </label>

        <input
          v-else
          class="in-row-margin"
          type="datetime-local"
          :min="now"
          :value="formattedDateForInput"
          style="color: #ff2400"
          @input="handleDateInput"
          @keydown.prevent
        >
      </div>
      <input type="checkbox" class="checkbox">
    </div>

    <div class="task-buttons">
      <SimpleImageButton
        :id="'EditButton' + id"
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
