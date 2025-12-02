<script setup lang="ts">

import {computed, nextTick, onUnmounted, ref, watch} from "vue";
import QuestsBlock from "../QuestComponents/QuestsBlock.vue";
import QuestsList from "../QuestComponents/QuestsList.vue";
import AddingImageButton from "@/components/Design/AddingImageButton.vue";
//import QuestsList from "@/components/Advanced/QuestsList.vue";

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
  type: string,
  label: string
}

const QuestTypes = Object.freeze({
    MAIN: 'main',
    SIDE: 'side'
  }
)

let nextID = 1
//Массив квестов
const quests = ref<Quest[]>([])
const mainQuests = computed<Quest[]>(() => {
  return quests.value.filter(quest => quest.type === QuestTypes.MAIN);
});
const sideQuests = computed<Quest[]>(() => {
  return quests.value.filter(quest => quest.type === QuestTypes.SIDE);
});


function makeQuest(type: string) {
  return {
    label: 'Безымянный квест' + nextID,
    id: nextID++,
    type,
  }
}

//Добавляет новый главный квест в массив квестов.
//Вставку осуществляет перед первым сайд-квестом, либо в конце массива, если
//сайд-квестов нет.
//Закрывает меню добавления.
const addMainQuest = () => {
  //Ищем первый элемент с типом "side"
  //Гарантируется, что мы будем хранить сначала главные квесты, а потом сайд-квесты
  let result = quests.value.findIndex(quest => quest.type === QuestTypes.SIDE)
  if (result == -1)
    quests.value.push(makeQuest(QuestTypes.MAIN))
  else
    quests.value.splice(result, 0, makeQuest(QuestTypes.MAIN))

  isMenuOpen.value = false
}

const addSideQuest = () => {
  quests.value.push(makeQuest(QuestTypes.SIDE))
  isMenuOpen.value = false
}

//Удаляет квест из массива.
const removeQuest = (index: number) => {
  quests.value.splice(index, 1);
}

//Для сворачивания/разворачивания блоков
const isMainQuestsListOpen = ref(true);
const toggleMainQuests = () => {
  isMainQuestsListOpen.value = !isMainQuestsListOpen.value
  console.log(isMainQuestsListOpen.value)
}
const isSideQuestsListOpen = ref(true);
const toggleSideQuests = () => {
  isSideQuestsListOpen.value = !isSideQuestsListOpen.value
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
        @click="addMainQuest"
      >
        Основной квест
      </button>

      <button
        class="add-button"
        style="color: #008000"
        id="sub-quest-button"
        @click="addSideQuest"
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
      ></QuestsBlock>

      <QuestsBlock
        :is-list-open="isSideQuestsListOpen"
        :button_text="'Побочные квесты'"
        :quests_array="sideQuests"
        :index-adjustment="mainQuests.length"
        @removeQuest="removeQuest"
        @toggleList="toggleSideQuests"
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
