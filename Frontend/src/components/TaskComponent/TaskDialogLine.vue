<script setup lang="ts">

const props = defineProps<{
  headerText: string,
  descrText: string,
  exampleText: string,
}>();

</script>

<template>
  <div class="dialog-line">
    <h1>
      {{ headerText }}
    </h1>

    <h5>
      {{ descrText }}
    </h5>

    <h5>
      <em>{{ exampleText }}</em>
    </h5>
  </div>
</template>

<style scoped>
.task-dialog h1 {
  font-size: 34px;
  color: #ff2400;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 15px;
}

.task-dialog h5 {
  font-size: 16px;
  margin-top: 15px;
  margin-bottom: 5px;
  margin-left: 15px;
}

.dialog-line {
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;

  padding-right: 10px;

  cursor: pointer;
}
</style>
