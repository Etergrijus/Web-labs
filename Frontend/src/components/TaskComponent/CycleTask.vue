<script setup lang="ts">

import SimpleImageButton from "../Design/SimpleImageButton.vue";
import {onMounted, ref} from "vue";
import {editing} from "@/composables/tasksFunctions";

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

const taskTitle = ref(props.title)
const taskTitleEl = ref<HTMLElement | null> (null)

const {isEdit, editButtonText, toggleEdit } = editing()

const handleEdit = () => {
  toggleEdit(taskTitleEl.value)
}

</script>

<template>
  <div class="row task-style">
    <div class="column" style="width: 700px">
      <div class="row" style="align-items: baseline;">
        <label
          class="task-header-text"
          ref="taskTitleEl"
        >
          {{ taskTitle }}
        </label>

        <label
          class="task-header-text in-row-margin"
          style="color: var(--my-scarlet)"
          v-if="!isEdit"
        >
          {{ needful }}
        </label>

        <input
          v-else
          type="number"
          style="margin-left: 20px"
          v-model.number="needful"
          :min="1"
          :max="100"
          @keydown.prevent
        >

        <label class="task-header-text in-row-margin">раз</label>
      </div>

      <input
        type="number"
        style="color: #eeeeee"
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
        @click="handleEdit"
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
