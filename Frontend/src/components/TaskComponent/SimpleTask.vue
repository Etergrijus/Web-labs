<script setup lang="ts">

import SimpleImageButton from "../Design/SimpleImageButton.vue";
import {ref} from "vue";
import {editing} from "../../composables/tasksFunctions"

const props = defineProps<{
  index: number,
  id: number,
  title: string,
}>()

const emit = defineEmits(['remove'])

const taskTitle = ref(props.title)
const taskTitleEl = ref<HTMLElement | null> (null)

const handleRemove = () => {
  emit('remove', props.index)
}

const { editButtonText, toggleEdit } = editing()

const handleEdit = () => {
  toggleEdit(taskTitleEl.value)
}

</script>

<template>
  <div class="row task-style">
    <div class="column" style="width: 700px">
      <label
        class="task-header-text"
        ref="taskTitleEl"
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
