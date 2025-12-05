<script setup lang="ts">

import {computed, ref} from "vue";
import {decodeHTML5} from "entities";

const props = defineProps<{
  id: string,
  type: string,
  label_text: string,
  modelValue: string,
  span_show: boolean,
  span_text: string
}>();

const emit = defineEmits(['inputKeyUp', 'update:modelValue'])

const local_inputRef = ref<HTMLElement | null>(null);
const local_spanRef = ref<HTMLElement | null>(null);

const inputModelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

defineExpose({
  inputRef: local_inputRef,
  spanRef: local_spanRef,
})

</script>

<template>
  <div class="input-container">
    <label
      :for="id"
      class="edit-label"
      v-html="label_text"
    >
    </label>
    <input
      :type="type"
      :id="id"
      :name="id"
      class="edit-input"
      ref="local_inputRef"
      v-model="inputModelValue"
      @keyup="$emit('inputKeyUp')"
    >
    <span
      v-show="span_show"
      class="tooltip"
      ref="local_spanRef"
    >
      {{ span_text }}
    </span>
  </div>
</template>

<style scoped>

.edit-label {
  display: block;
  margin-bottom: 10px;
}

.edit-input {
  width: 100%;
  padding: 8px;
  border-style: dot-dash;
  border-color: lightgray;
  box-sizing: border-box;
  margin-bottom: 20px;

  font-family: Arial serif;
  font-size: 20px;
}

.input-container {
  position: relative;
}

.tooltip {
  position: fixed;
  background-color: #f44336;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  z-index: 10;
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 100%;
  transform: translateY(-50%);
  border: 6px solid transparent;
  border-right-color: #f44336;
}
</style>
