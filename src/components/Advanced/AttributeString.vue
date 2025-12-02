<script setup lang="ts">

import {type Component, defineAsyncComponent} from "vue";

const props = defineProps<{
  attribute_value: number,
  attribute_emblem?: string
}>()

const AsyncComp = defineAsyncComponent(() =>
  import((`@/components/Drawnings/${props.attribute_emblem}.vue`))
)
</script>

<template>
  <div class="attribute-row">
    <component :is="AsyncComp"></component>
    <label class="attribute-value-label">
      {{ attribute_value.toString() }}
    </label>
  </div>
</template>

<style scoped>
/* Стили для самих SVG-компонентов (предполагаем, что они рендерят <svg>) */
.attributes-container svg {
  flex: 1; /* Равномерное распределение ширины между SVG */
  /*  max-width: 100%;  !* Максимальная ширина — 100% от контейнера, чтобы не выходили за границы *!*/
  height: auto; /* Автоматическая высота для сохранения пропорций */
  min-width: 50px; /* Минимальная ширина, чтобы не сжимались слишком сильно (настрой под нужды) */
  max-width: 100px;
}

.attribute-row {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.attribute-value-label {
  font-size: 80px;
}

</style>
