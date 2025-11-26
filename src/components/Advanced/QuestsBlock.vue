<script setup lang="ts">

import type {Quest} from "../ContentBlocks/TasksBlock.vue";
import QuestsList from "../Advanced/QuestsList.vue";

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
</script>

<template>
    <button
      class="default-button"
      v-if="quests_array.length"
      @click="$emit('toggleList')"
    >
      {{button_text}}
    </button>

    <QuestsList
      v-for="(quest, index) in quests_array"
      :key="quest.id"
      :index="index"
      :quest="quest"
      @removeQuest="handleRemove(index)"
      v-show="isListOpen"
    ></QuestsList>
</template>

<style scoped>

</style>
