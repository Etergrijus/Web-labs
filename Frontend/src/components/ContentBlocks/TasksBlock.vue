<script setup lang="ts">

import {computed, nextTick, onUnmounted, ref, watch} from "vue";
import QuestsBlock from "../QuestComponents/QuestsBlock.vue";
import AddingImageButton from "../Design/AddingImageButton.vue";
import {Task} from "../QuestComponents/QuestsList.vue";
import api from "../../services/api"
import {useRoute} from "vue-router";

const route = useRoute()
const char_id = route.query.id;

const props = defineProps<{
  quests: Quest[],
}>()

const emit = defineEmits(['fetch'])

const isMenuOpen = ref(false);

//Реф на кнопку добавления квеста тянем из дочернего компонента
const addQuestButtonRef = ref<InstanceType<typeof AddingImageButton> | null>(null)
const menuRef = ref<HTMLElement | null>(null)

//Обновляем позицию меню добавления квеста,
//чтобы обеспечить переносимость при прокрутке и изменении размера экрана
const updatePosition = async () => {
  const buttonElement = addQuestButtonRef.value?.buttonRef
  if (isMenuOpen.value && buttonElement && menuRef.value) {
    await nextTick() // Ждём, если нужно
    const buttonRect = buttonElement.getBoundingClientRect()
    menuRef.value.style.top = `${buttonRect.bottom - 20}px`
    menuRef.value.style.left = `${buttonRect.left + 15}px`
  }
}

const toggleMenu = async () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    await nextTick()
    // Первоначальный расчёт
    await updatePosition()
    // Добавляем слушатели
    window.addEventListener('scroll', updatePosition)
    window.addEventListener('resize', updatePosition)
  } else {
    // Убираем слушатели при закрытии
    window.removeEventListener('scroll', updatePosition)
    window.removeEventListener('resize', updatePosition)
  }
}

onUnmounted(() => {
  window.removeEventListener('scroll', updatePosition)
  window.removeEventListener('resize', updatePosition)
})

//Интерфейс для квеста
export interface Quest {
  id: number,
  status: string,
  type: string,
  title: string,
  tasks?: Task[]
}

const QuestTypes = Object.freeze({
    MAIN: 'Main',
    SIDE: 'Side'
  }
)

//Массив квестов
const quests = computed(() => {
  //Сортируем его так, чтобы основные шли в начале, а побочные в конце
  const mainBuffer = []
  const sideBuffer = []
  props.quests.forEach((quest) => {
    if (quest.type === QuestTypes.MAIN)
      mainBuffer.push(quest)
    else
      sideBuffer.push(quest)
  })

  const result = []
  return result.concat(mainBuffer, sideBuffer)
})

const mainQuests = computed<Quest[]>(() => {
  return quests.value.filter(quest => quest.type === QuestTypes.MAIN);
});
const sideQuests = computed<Quest[]>(() => {
  return quests.value.filter(quest => quest.type === QuestTypes.SIDE);
});

//Для сворачивания/разворачивания блоков
const isMainQuestsListOpen = ref(true);
const toggleMainQuests = () => {
  isMainQuestsListOpen.value = !isMainQuestsListOpen.value
}
const isSideQuestsListOpen = ref(true);
const toggleSideQuests = () => {
  isSideQuestsListOpen.value = !isSideQuestsListOpen.value
}

const nextID = ref(quests.value.length)


function questExceptionHandle(error: any, action: string) {
  if (error.response) {
      const status = error.response.status
      const errorData = error.response.data;
      const errorMessage = errorData.error;

      switch (status) {
        case 409:
          if (errorMessage === "foreign-key failed, incorrect character id") {
            console.log("Ошибка: неверный ID персонажа, попытка" + action +  "квест не себе")
          }
          break;
        case 400:
          if (errorMessage === "Unexpected quest type")
            console.log("Ошибка: неожиданный тип квеста")
      }
    } else if (error.request) {
      console.log('Нет ответа от сервера. Проверьте доступность бэкенда.');
    } else {
      console.log('Ошибка при отправке запроса.');
    }
}

const addQuest = async (type: string) => {
  try {
    console.log(char_id, "Безымянный квест" + nextID.value++, type)
    const response = await api.post('/quest', {
      title: "Безымянный квест" + nextID.value,
      type: type,
      char_id: Number(char_id)
    })

    emit('fetch')
    isMenuOpen.value = false
  } catch (error) {
      questExceptionHandle(error, "добавить")
  }
}

//Удаляет квест из массива.
const removeQuest = async (index: number) => {
  try {
    console.log("Deleting quest with index " + index)
    const response = await api.delete('/quest/' + quests.value[index].id)
    emit('fetch')
  } catch (error) {
    questExceptionHandle(error, "удалить")
  }
}

//Изменяет название квеста.
const updateQuest = async (index: number) => {
  try {
    console.log("Updating quest with index " + index + ' ' + quests.value[index].title)
    const response = await api.patch('/quest/' + quests.value[index].id, {
      new_title: quests.value[index].title
    })
    emit('fetch')
  } catch (error) {
    questExceptionHandle(error, "изменить")
  }
}
</script>

<template>
  <div class="tasks-block">

    <div class="justify">
      <AddingImageButton
        button-text="Добавить квест"
        image-url="/img/parchment.png"
        @click="toggleMenu"
        :aria-expanded="isMenuOpen"
        ref="addQuestButtonRef"
      ></AddingImageButton>

    </div>

    <!--    v-show для открытия меню -->
    <div id="menu"
         v-show="isMenuOpen"
         ref="menuRef"
         role="menu"
         class="add-quest-menu"
    >
      <p>Вы получили задание.<br>Волею судеб это...</p>
      <button
        class="add-button"
        style="color: #ff6800"
        id="main-quest-button"
        @click="addQuest(QuestTypes.MAIN)"
      >
        Основной квест
      </button>

      <button
        class="add-button"
        style="color: #008000"
        id="sub-quest-button"
        @click="addQuest(QuestTypes.SIDE)"
      >
        Побочный квест
      </button>
    </div>

    <div class="quests-container">
      <QuestsBlock
        :is-list-open="isMainQuestsListOpen"
        :button_text="'Основные квесты'"
        :quests_array="mainQuests"
        :index-adjustment="0"
        @removeQuest="removeQuest"
        @toggleList="toggleMainQuests"
        @updateQuestTitle="updateQuest"
      ></QuestsBlock>

      <QuestsBlock
        :is-list-open="isSideQuestsListOpen"
        :button_text="'Побочные квесты'"
        :quests_array="sideQuests"
        :index-adjustment="mainQuests.length"
        @removeQuest="removeQuest"
        @toggleList="toggleSideQuests"
        @updateQuestTitle="updateQuest"
      ></QuestsBlock>
    </div>

  </div>
</template>

<style scoped>
.tasks-block {
  display: flex;
  flex-direction: column;
  width: calc(66%);

  padding-top: 45px;
}

.tasks-block .justify {
  display: flex;
  flex-direction: row;
  justify-content: center;
}


.add-quest-menu {
  z-index: 10;
  display: flex;
  flex-direction: column;

  position: fixed;
  border: red 3px solid;
  border-radius: 30px;
  background-color: #151719;
}

.add-quest-menu p {
  background-color: inherit;
  text-align: center;
  color: red;
  font-size: 26px;
  margin: 10px;
}

.add-button {
  font-size: 24px;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  text-align: center;
  font-family: Silkscreen, serif;
  padding: 20px;
  border-radius: 30px;
  border: #ff2400 3px solid;
  margin: 15px;
}

.add-button:active {
  transform: scale(0.95);
}

#main-quest-button:active {
  background-color: rgba(255, 104, 0, 0.2);
}

#main-quest-button:hover {
  background-color: rgba(255, 104, 0, 0.1);
}

#sub-quest-button:active {
  background-color: rgba(0, 128, 0, 0.2);
}

#sub-quest-button:hover {
  background-color: rgba(0, 128, 0, 0.1);
}

.quests-container {
  margin-top: 20px;
}

@media screen and (max-width: 768px) {
  .tasks-block {
    width: calc(100%);
  }
}

</style>
