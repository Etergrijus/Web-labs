<script setup lang="ts">

import type {Quest} from "../ContentBlocks/TasksBlock.vue";
import QuestsList from "./QuestsList.vue";
import SimpleImageButton from "../Design/SimpleImageButton.vue";
import {ref} from "vue";
import TaskDialog from "../TaskComponent/TaskDialog.vue";

const props = defineProps<{
  button_text: string,
  quests_array: Array<Quest>,
  isListOpen: Boolean,
  //Свойство для корректировки индекса для побочных квестов
  //Лучше так, чем всё перекапывать
  //MainQuestAdjustment = 0
  //SideQuestAdjustment = mainQuest.length
  indexAdjustment: number
}>();

const emit = defineEmits(['removeQuest', 'toggleList']);

const handleRemove = (localIndex: number) => {
  const correctIndex = localIndex + props.indexAdjustment
  emit('removeQuest', correctIndex)
}

// Храним не флаг видимости списка, а ID квеста, для которого открыто окно
const openDialogQuestId = ref<number | null>(null)
const isDialogOpen = ref(false);
const openDialog = (questId: number) => {
  openDialogQuestId.value = questId
  isDialogOpen.value = true
  //Обманываем наблюдатель добавления задачи в квест.
  //Обнуляем значение этой задачи, чтобы наблюдатель всегда ловил триггер
  //И можно было без проблем добавлять одинаковые задачи подряд.
  addingTask.value = undefined
  targetQuestId.value = null
}

const closeDialog = () => {
  openDialogQuestId.value = null
  isDialogOpen.value = false
}

const addingTask = ref("")
const targetQuestId = ref(null)
const handleAddTask = (taskType: string, targetId: number) => {
  addingTask.value = taskType
  targetQuestId.value = targetId
}
</script>

<template>
  <SimpleImageButton
    :button-text="button_text"
    image-url="/img/tape.png"
    :font_size="48"
    :image_width="1200"
    @click="$emit('toggleList')"
    v-if="quests_array.length"
  ></SimpleImageButton>

  <QuestsList
    v-for="(quest, index) in quests_array"
    v-show="isListOpen"
    :key="quest.id"
    :index="index"
    :quest="quest"
    :adding-task="addingTask"
    :target-id="targetQuestId"
    @removeQuest="handleRemove(index)"
    @on-open-dialog="openDialog"
  ></QuestsList>

  <TaskDialog v-if="openDialogQuestId"
              @close="closeDialog"
              :is-open="isDialogOpen"
              :quest-id="openDialogQuestId"
              @add-task="handleAddTask"
  ></TaskDialog>
</template>

<style scoped>

</style>
