<script setup lang="ts">

import SimpleImageButton from "../Design/SimpleImageButton.vue";
import {ref} from "vue";

const props = defineProps<{
  index: number,
  id: number,
}>()

const emit = defineEmits(['remove'])

const handleRemove = () => {
  emit('remove', props.index)
}

const editButtonText = ref("Редактировать")
const taskTitle = ref("Что-то эпическое")
const isEdit = ref(false)

const editing = () => {
  const titleLabel = document.getElementById('task_title' + props.id)
  if (isEdit.value === false) {
    editButtonText.value = "Сохранить"
    isEdit.value = true
    titleLabel.contentEditable = String(true);
  }
  else if (isEdit.value === true) {
    editButtonText.value = "Редактировать"
    isEdit.value = false
    titleLabel.contentEditable = String(false);
  }
}
</script>

<template>
  <div class="row task-style">
    <div class="column" style="width: 450px">
      <label
        class="task-header-text"
        :id="'task_title' + id"
      >
        {{taskTitle}}
      </label>
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

</style>
