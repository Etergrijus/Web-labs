<script setup lang="ts">

import TaskDialogLine from "../TaskComponent/TaskDialogLine.vue";
import {onMounted, ref} from "vue";

const props = defineProps<{
  isOpen: boolean,
  questId: number
}>();

const emits = defineEmits(['addTask', 'close'])

//targetID - ID квеста, в который добавляем
const selectTask = (taskType: string, targetId: number) => {
  emits('addTask', taskType, targetId)
  emits('close')
}

// Генерируем id для диалога на основе questId из пропсов
const dialogId = ref("taskDialog" + props.questId.toString());
const dialogRef = ref<HTMLDialogElement | undefined>(undefined)

onMounted(() => {
  if (dialogRef.value)
    dialogRef.value.showModal()
})

</script>

<template>
  <dialog class="task-dialog" :id="dialogId" ref="dialogRef">
    <div class="row">
      <button class="close-button" @click="$emit('close')">
      </button>
    </div>

    <TaskDialogLine
      header-text="Простая задача"
      descr-text="Задача, требующая только выполнения, когда придёт час"
      example-text="Например, &quot;купить сапоги&quot;"
      @click="selectTask('simple', questId)"
    ></TaskDialogLine>

    <TaskDialogLine
      header-text="Циклическая задача"
      descr-text="Задача, требующая повторения одного и того же действия до победного конца"
      example-text="Например, &quot;Поесть 3 раза&quot;"
      @click="selectTask('cycle', questId)">
    </TaskDialogLine>

    <TaskDialogLine
      header-text="Задача с дедлайном"
      descr-text="Задача, которую надо успеть выполнить, чтобы не встретиться
      с последствиями своей медлительности"
      example-text="Например, &quot;Сдать работы до 30.12.2025&quot;"
      @click="selectTask('deadline', questId)">
    </TaskDialogLine>

    <TaskDialogLine
      header-text="Монотонная задача"
      descr-text="Периодический вариант циклической задачи.
                Требует выполнения одинаковых действий за определённый период.
                Невыполнение прерывает серию!"
      example-text="Например, &quot;Тренироваться каждый день 7 раз&quot;"
     @click="selectTask('monotonous', questId)">
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
