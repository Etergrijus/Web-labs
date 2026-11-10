<script setup lang="ts">
import {Quest} from "../ContentBlocks/TasksBlock.vue"
import {computed, DefineComponent, ref, watch} from "vue";
import SimpleImageButton from "../Design/SimpleImageButton.vue";
import SimpleTask from "../TaskComponent/SimpleTask.vue";
import CycleTask from "../TaskComponent/CycleTask.vue";
import DeadlineTask from "../TaskComponent/DeadlineTask.vue";
import MonotonousTask from "../TaskComponent/MonotonousTask.vue";

import api from "../../services/api"

const props = defineProps<{
  quest: Quest,
  index: number,
  addingTask: string,
  targetId: number,
  indexAdjustment: number
}>();

const labelId = computed(() => `quest-label-${props.index + props.indexAdjustment}`);

const emit = defineEmits(['onOpenDialog', 'onRemoveQuest', 'onUpdateTitle']);

//Объект для задачи
export interface Task {
  id: number,
  quest_id?: number,
  type: string,
  title: string,
  status: boolean,
  //Данные, зависящие от типа подзадачи
  task_data: any,
}

export interface TaskWithComponent extends Task {
  component: DefineComponent<any, any, any, any, any, any, any, any, any, any, any> | undefined;
}

//Аналог enum'а для определения Vue-компонента для отрисовки задачи
const TaskTypes = Object.freeze({
  SIMPLE: 'Simple',
  CYCLE: 'Cycle',
  DEADLINE: 'Deadline',
  MONOTONOUS: 'Monotonous'
})

//Определяем каким компонентом отрисовывать задачу
function defineComponent(task: Task): TaskWithComponent {
  let componentName: DefineComponent<any, any, any, any, any, any, any, any, any, any, any> | undefined;
  switch (task.type) {
    case TaskTypes.SIMPLE:
      componentName = componentNamesMap[TaskTypes.SIMPLE]
      break;
    case TaskTypes.CYCLE:
      componentName = componentNamesMap[TaskTypes.CYCLE]
      break;
    case TaskTypes.DEADLINE:
      componentName = componentNamesMap[TaskTypes.DEADLINE]
      break;
    case TaskTypes.MONOTONOUS:
      componentName = componentNamesMap[TaskTypes.MONOTONOUS]
      break;
  }
  return {
    ...task,
    component: componentName,
  } as TaskWithComponent
}

const questTasksRef = ref<Task[]>(props.quest.tasks)
const questTasks = computed(() => {
  return questTasksRef.value.map(defineComponent)
})

const componentNamesMap = {
  [TaskTypes.SIMPLE]: SimpleTask,
  [TaskTypes.CYCLE]: CycleTask,
  [TaskTypes.DEADLINE]: DeadlineTask,
  [TaskTypes.MONOTONOUS]: MonotonousTask
};

watch(() => props.addingTask, async () => {
  if (props.targetId === props.quest.id) {
    if (await addTask(props.addingTask) == true)
      await fetchQuestTasks()
  }
})

function taskExceptionHandle(error: any, action: string) {
  if (error.response) {
      const status = error.response.status
      const errorData = error.response.data;
      const errorMessage = errorData.error;

      switch (status) {
        case 409:
          if (errorMessage === "foreign-key failed, incorrect character id") {
            console.log("Ошибка: неверный ID задачи, попытка" + action +  "задачу не себе")
          }
          break;
        case 400:
          if (errorMessage === "Unexpected quest type")
            console.log("Ошибка: неожиданный тип задачи")
      }
    } else if (error.request) {
      console.log('Нет ответа от сервера. Проверьте доступность бэкенда.');
    } else {
      console.log('Ошибка при отправке запроса.');
    }
}

const addTask = async (taskType: string): Promise<boolean> => {
  taskType = taskType[0].toUpperCase() + taskType.slice(1)
  try {
    const response = await api.post('/task', {
      title: "Что-то эпическое",
      type: taskType,
      quest_id: props.quest.id
    })
    return true
  } catch (error) {
    taskExceptionHandle(error, "добавить")
    return false
  }
}

const fetchQuestTasks = async () => {
  try {
    const response = await api.get('/quest/' + props.quest.id)
    console.log(response.data)
    questTasksRef.value = response.data.tasks
  } catch (error) {
    taskExceptionHandle(error, "получить")
  }
}

const removeTask = (id: number) => {
  questTasks.value.splice(id, 1)
}

const updateQuestTitle = () => {
  const newTitle = document.getElementById(labelId.value).innerText
  if (newTitle !== props.quest.title) {
    props.quest.title = document.getElementById(labelId.value).innerText
    emit('onUpdateTitle', props.index)
  }
}

const skipEnterKeyDown = () => {
  const questTitleLabel = document.getElementById(labelId.value)
  questTitleLabel.blur()
}


</script>

<template>
  <div class="quest">
    <label
      :for="labelId"
      :id="labelId"
      style=" font-size: 32px; margin-bottom: 50px; cursor: text"
      contenteditable="true"
      @keydown.tab="updateQuestTitle"
      @keydown.enter="skipEnterKeyDown"
      @blur="updateQuestTitle"
    >
      {{ quest.title }}
    </label>

    <div class="row quest-row">
      <SimpleImageButton
        button-text="Добавить задачу"
        image-url="img/parchment.png"
        :font_size="36"
        :image_width="300"
        :image_height="150"
        @click="$emit('onOpenDialog', quest.id)"
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
        @click="$emit('onRemoveQuest', props.index)"
      >
      </SimpleImageButton>
    </div>

    <div class="task">
      <component
        v-for="(task, index) in questTasks"
        :key="task.id"
        :is="task.component"
        :taskData="task.task_data"
        :index="index"
        :id="task.id"
        :title="task.title"
        @remove="removeTask"
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
