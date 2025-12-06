<script setup lang="ts">
import {Quest} from "../ContentBlocks/TasksBlock.vue"
import {computed, DefineComponent, ref, watch} from "vue";
import SimpleImageButton from "../Design/SimpleImageButton.vue";
import SimpleTask from "../TaskComponent/SimpleTask.vue";
import CycleTask from "../TaskComponent/CycleTask.vue";
import DeadlineTask from "../TaskComponent/DeadlineTask.vue";
import MonotonousTask from "../TaskComponent/MonotonousTask.vue";

const props = defineProps<{
  quest: Quest,
  index: number,
  onOpenDialog: Function, // Функция для открытия, приходит из QuestsBlock
  addingTask: string,
  targetId: number,
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
  [TaskTypes.DEADLINE]: DeadlineTask,
  [TaskTypes.MONOTONOUS]: MonotonousTask
};
const addTask = (taskType: string) => {
  //Смешная херня, чтобы TypeScript не ругался
  //Ужас-ужас, зато будет билдиться
  let componentName: DefineComponent<any, any, any, any, any, any, any, any, any, any, any> | undefined;
  let defaultTaskData: any;

  switch (taskType) {
    case TaskTypes.SIMPLE:
      componentName = componentNamesMap[TaskTypes.SIMPLE]
      break;
    case TaskTypes.CYCLE:
      componentName = componentNamesMap[TaskTypes.CYCLE];
      defaultTaskData = {needfulCount: 1, doneCount: 0};
      break;
    case TaskTypes.DEADLINE:
      componentName = componentNamesMap[TaskTypes.DEADLINE]
      //Сначала создаём эту штуку, которая хранит дату в ISO 8601 с учётом UTC,
      //чтобы не париться над часовыми поясами
      const milliseconds = Date.UTC(2030, 0, 1, 0, 0, 0)
      //И делаем из этого дату
      const date = new Date(milliseconds)
      defaultTaskData = {deadlineDate: date.toJSON()}
      break;
    case TaskTypes.MONOTONOUS:
      componentName = componentNamesMap[TaskTypes.MONOTONOUS]
      defaultTaskData = {
        needfulCount: 3,
        doneCount: 0,
        periodValue: 1,
        periodMeasureUnit: "day"
      };
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

watch(() => props.addingTask, () => {
  if (props.targetId === props.quest.id) {
    addTask(props.addingTask)
  }
})
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

    <div class="row quest-row">
      <SimpleImageButton
        button-text="Добавить задачу"
        image-url="img/parchment.png"
        :font_size="36"
        :image_width="300"
        :image_height="150"
        @click="/*showTaskDialog*/onOpenDialog"
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
</template>

<style scoped>
.quest {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  margin-top: 20px;
}

.quest-row {
  justify-content: space-evenly;
  width: 100%;
}

.task {
  width: 80%;

}
</style>
