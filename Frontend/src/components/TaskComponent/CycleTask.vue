<script setup lang="ts">

import SimpleImageButton from "../Design/SimpleImageButton.vue";
import {onMounted, ref} from "vue";

interface CycleTaskData {
  needful_count: number,
  done_count: number,
}

const props = defineProps<{
  taskData: CycleTaskData,
  index: number,
  id: number,
  title: string,
}>()

const emit = defineEmits(['remove'])

const handleRemove = () => {
  emit('remove', props.index)
}

const needful = ref(props.taskData.needful_count)
const done = ref(props.taskData.done_count)

const editButtonText = ref("Редактировать")
const taskTitle = ref(props.title)
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

const updateDone = (event) => {
  done.value = parseInt(event.target.value, 10)
}
</script>

<template>
  <div class="row task-style">
    <div class="column" style="width: 450px">
      <div class="row" style="align-items: center">
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

        <label class="task-header-text in-row-margin">раз</label>
      </div>

      <input
        type="number"
        :min="0"
        :step="1"
        :max="needful"
        v-model.number="done"
        :value="done"

        @keydown.prevent
      >
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

</style>
