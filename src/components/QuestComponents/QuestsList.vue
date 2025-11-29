<script setup lang="ts">
import {Quest} from "../ContentBlocks/TasksBlock.vue"
import {computed} from "vue";

const props = defineProps<{
  quest: Quest,
  index: number;
}>();

const labelId = computed(() => `quest-label-${props.index}`);
const btnId = computed(() => `quest-button-${props.index}`);

const emit = defineEmits(['removeQuest']);

const removeQuest_ = () => {
  emit('removeQuest', props.index);
}
</script>

<template>
  <div class="quest">
    <label
      :for="labelId"
      style="font-size: 32px; margin-bottom: 50px; cursor: text"
      contenteditable="true"
    >
      {{ quest.label }}
    </label>

    <div class="row">
      <button
        class="content-button"
        :id="btnId"
        style="margin-right: 50px"
      >
        Добавить подзадачу
      </button>

      <button
        class="content-button"
        @click="removeQuest_"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<style scoped>
.quest {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  margin-top: 20px;
}
</style>
