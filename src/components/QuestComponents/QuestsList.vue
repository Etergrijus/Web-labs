<script setup lang="ts">
import {Quest} from "../ContentBlocks/TasksBlock.vue"
import {computed, nextTick, ref, shallowRef} from "vue";
import SimpleImageButton from "@/components/Design/SimpleImageButton.vue";
import TaskDialog from "@/components/TaskComponent/TaskDialog.vue";
import SimpleTask from "../TaskComponent/SimpleTask.vue";
import CycleTask from "@/components/TaskComponent/CycleTask.vue";

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

//Объект для задачи
interface Task {
  id: number,
  quest_id: number,
  type: string,
  name: string,
  status: boolean,
  component: HTMLElement,
  //Данные, зависящие от типа подзадачи
  taskTypeData: any
}

const TaskTypes = Object.freeze({
  SIMPLE: 'simple',
  CYCLE: 'cycle',
  DEADLINE: 'deadline',
  MONOTONOUS: 'monotonous'
})

const questTasks = ref<Task[]>([])
let nextId = 1

const componentNamesMap = {
  [TaskTypes.SIMPLE]: SimpleTask,
  [TaskTypes.CYCLE]: CycleTask,
};
const addTask = (taskType: string) => {
  let componentName: HTMLElement;
  let defaultTaskData: any;

  switch (taskType) {
    case TaskTypes.SIMPLE:
      componentName = componentNamesMap[TaskTypes.SIMPLE]
      break;
    case TaskTypes.CYCLE:
      componentName = componentNamesMap[TaskTypes.CYCLE];
      defaultTaskData = { needfulCount: 1, doneCount: 0};
      break;
  }

  const newTask = {
    id: nextId++,
    quest_id: props.quest.id,
    type: taskType,
    name: 'Что-то эпическое',
    status: false,
    component: componentName,
    taskTypeData: defaultTaskData
  }

  questTasks.value.push(newTask)
}

const isDialogOpen = ref(false)
const taskDialogId = "taskDialog" + props.quest.id.toString()
const showTaskDialog = async () => {
  isDialogOpen.value = true
  await nextTick()
  const dialogElement = document.getElementById(taskDialogId)
  if (dialogElement && dialogElement instanceof HTMLDialogElement) {
    dialogElement.showModal()
  } else
    isDialogOpen.value = false
}

const closeDialog = async () => {
  const dialogElement = document.getElementById(taskDialogId)
  if (dialogElement && dialogElement instanceof HTMLDialogElement) {
    dialogElement.close()
    isDialogOpen.value = false
    await nextTick()
  }
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
      <SimpleImageButton
        button-text="Добавить задачу"
        image-url="img/parchment.png"
        :font_size="36"
        :image_width="300"
        :image_height="150"
        @click="showTaskDialog"
      >
      </SimpleImageButton>

      <SimpleImageButton
        button-text="Выполнить"
        image-url="img/parchment.png"
        :font_size="40"
        :image_width="300"
        :image_height="150"
      >
      </SimpleImageButton>

      <SimpleImageButton
        button-text="Отменить"
        image-url="img/parchment.png"
        :font_size="40"
        :image_width="300"
        :image_height="150"
        @click="removeQuest_"
      >
      </SimpleImageButton>
    </div>

    <div class="task">
      <component
        v-for="task in questTasks"
        :key="task.id"
        :is="task.component"
        :taskData="task.taskTypeData"
      ></component>
    </div>
  </div>

  <TaskDialog v-if="isDialogOpen" :id="taskDialogId" @add-task="addTask" @close="closeDialog">
  </TaskDialog>
</template>

<style scoped>
.quest {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  margin-top: 20px;
}

.quest .row {
  justify-content: space-evenly;
  width: 100%;
}

.task {
  justify-content: space-evenly;
  width: 80%;

}
</style>
