<script setup lang="ts">

import TaskDialogLine from "@/components/TaskComponent/TaskDialogLine.vue";

const emits = defineEmits(['addTask', 'close'])

const selectTask = (taskType: string) => {
  emits('addTask', taskType)
  //closeDialog()
  emits('close')
}

</script>

<template>
  <dialog class="task-dialog">
    <div class="row">
      <button class="close-button" @click="$emit('close')">
      </button>
    </div>

    <TaskDialogLine
      header-text="Простая задача"
      descr-text="Задача, требующая только выполнения, когда придёт час"
      example-text="Например, &quot;купить сапоги&quot;"
      @click="selectTask('simple')"
    ></TaskDialogLine>

    <TaskDialogLine
      header-text="Циклическая задача"
      descr-text="Задача, требующая повторения одного и того же действия до победного конца"
      example-text="Например, &quot;Поесть 3 раза&quot;"
      @click="selectTask('cycle')">
    </TaskDialogLine>

    <TaskDialogLine
      header-text="Задача с дедлайном"
      descr-text="Задача, которую надо успеть выполнить, чтобы не встретиться
      с последствиями своей медлительности"
      example-text="Например, &quot;Сдать работы до 30.12.2025&quot;">
    </TaskDialogLine>

    <TaskDialogLine
      header-text="Монотонная задача"
      descr-text="Комбинация из циклической задачи и задачи с дедлайном.
                Требует выполнения одинаковых действий за определённый период.
                Невыполнение прерывает серию!"
      example-text="Например, &quot;Тренироваться каждый день 7 раз&quot;">
    </TaskDialogLine>
  </dialog>

</template>

<style scoped>
.task-dialog {
  background-color: #151719;
  border-radius: 10px;
  border: 2px solid gray;
  width: 500px;
  height: 610px;

  padding: 0;
}

.task-dialog .row {
  justify-content: flex-end;
  margin-bottom: 10px;
}

.close-button {
  cursor: pointer;
  width: 30px;
  height: 30px;

  background-image: url("/img/close-cross.png");
  background-size: cover;
  background-position: center center;

  margin-top: 15px;
  margin-right: 10px;
}

</style>
