<script setup lang="ts">

import {computed, nextTick, onUnmounted, ref} from "vue";

const isMenuOpen = ref(false);
const buttonRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)

//Обновляем позицию меню добавления квеста,
//чтобы обеспечить переносимость при прокрутке и изменении размера экрана
const updatePosition = async () => {
  if (isMenuOpen.value && buttonRef.value && menuRef.value) {
    await nextTick() // Ждём, если нужно
    const buttonRect = buttonRef.value.getBoundingClientRect()
    menuRef.value.style.top = `${buttonRect.bottom + 10}px`
    menuRef.value.style.left = `${buttonRect.left - 55}px`
  }
}

const toggleMenu = async () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    await nextTick()
    await updatePosition() // Первоначальный расчёт
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
interface Quest {
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
  isMainQuestsBtnVisible.value = true
}

const addSideQuest = () => {
  quests.value.push(makeQuest(QuestTypes.SIDE))
  isMenuOpen.value = false
  isSideQuestsBtnVisible.value = true
}

//Удаляет квест из массива.
//Пришлось делать функцию немного сложной
//Что ж, я только учусь
// (олень)
const removeQuest = (index: number) => {
  let type = quests.value[index]?.type
  quests.value.splice(index, 1);

  if (quests.value.length == 0) {
    isMainQuestsBtnVisible.value = false
    isSideQuestsBtnVisible.value = false
  } else {
    if (type == QuestTypes.MAIN)
      isMainQuestsExists()
    else if (type == QuestTypes.SIDE)
      isSideQuestsExists()
  }
}

function isMainQuestsExists() {
  if (quests.value.at(0).type != QuestTypes.MAIN)
    isMainQuestsBtnVisible.value = false
}

function isSideQuestsExists() {
  if (quests.value.at(-1).type != QuestTypes.SIDE)
    isSideQuestsBtnVisible.value = false
}

const isMainQuestsBtnVisible = ref(false);
const isSideQuestsBtnVisible = ref(false);

const isMainQuestsListOpen = ref(true);
const toggleMainQuests = () => {
  isMainQuestsListOpen.value = !isMainQuestsListOpen.value
}
const isSideQuestsListOpen = ref(true);
const toggleSideQuests = () => {
  isSideQuestsListOpen.value = !isSideQuestsListOpen.value
}
</script>

<template>
  <div class="tasks-block">

    <div class="justify">
      <button
        class="content-button"
        ref="buttonRef"
        type="button"
        @click="toggleMenu"
        :aria-expanded="isMenuOpen"
        aria-haspopup="menu"
      >
        Добавить квест
      </button>
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
      <button
        class="default-button"
        v-if="isMainQuestsBtnVisible"
        @click="toggleMainQuests"
      >
        Основные квесты
      </button>

      <div
        v-for="(quest, index) in mainQuests"
        :key="quest.id"
        class="quest"
        v-show="isMainQuestsListOpen"
      >
        <label
          :for="`quest-button` + index"
          style="font-size: 32px; margin-bottom: 50px; cursor: text"
          contenteditable="true"
        >
          {{ quest.label }}
        </label>

        <div class="row">
          <button
            class="content-button"
            :id="'quest-button' + index"
            style="margin-right: 50px"
          >
            Добавить подзадачу
          </button>

          <button
            class="content-button"
            @click="removeQuest(index)"
          >
            Удалить
          </button>
        </div>
      </div>

      <button
        class="default-button"
        v-if="isSideQuestsBtnVisible"
        @click="toggleSideQuests"
      >
        Побочные квесты
      </button>

      <div
        v-for="(quest, index) in sideQuests"
        :key="quest.id"
        class="quest"
        v-show="isSideQuestsListOpen"
      >
        <label
          :for="`quest-button` + index"
          style="font-size: 32px; margin-bottom: 50px; cursor: text"
          contenteditable="true"
        >
          {{ quest.label }}
        </label>

        <div class="row">
          <button
            class="content-button"
            :id="'quest-button' + index"
            style="margin-right: 50px"
          >
            Добавить подзадачу
          </button>

          <button
            class="content-button"
            @click="removeQuest(index + mainQuests.length)"
          >
            Удалить
          </button>
        </div>
      </div>

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

.quest {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  margin-top: 20px;
}

@media screen and (max-width: 768px) {
  .tasks-block {
    width: calc(100%);
  }
}
</style>
