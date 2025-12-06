import { computed, nextTick, onUnmounted, ref } from "vue";
import QuestsBlock from "../QuestComponents/QuestsBlock.vue";
import AddingImageButton from "../Design/AddingImageButton.vue";
const isMenuOpen = ref(false);
//Реф на кнопку добавления квеста тянем из дочернего компонента
const addQuestButtonRef = ref(null);
const menuRef = ref(null);
//Обновляем позицию меню добавления квеста,
//чтобы обеспечить переносимость при прокрутке и изменении размера экрана
const updatePosition = async () => {
    const buttonElement = addQuestButtonRef.value?.buttonRef;
    if (isMenuOpen.value && buttonElement && menuRef.value) {
        await nextTick(); // Ждём, если нужно
        const buttonRect = buttonElement.getBoundingClientRect();
        menuRef.value.style.top = `${buttonRect.bottom - 20}px`;
        menuRef.value.style.left = `${buttonRect.left + 15}px`;
    }
};
const toggleMenu = async () => {
    isMenuOpen.value = !isMenuOpen.value;
    if (isMenuOpen.value) {
        await nextTick();
        // Первоначальный расчёт
        await updatePosition();
        // Добавляем слушатели
        window.addEventListener('scroll', updatePosition);
        window.addEventListener('resize', updatePosition);
    }
    else {
        // Убираем слушатели при закрытии
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
    }
};
onUnmounted(() => {
    window.removeEventListener('scroll', updatePosition);
    window.removeEventListener('resize', updatePosition);
});
const QuestTypes = Object.freeze({
    MAIN: 'main',
    SIDE: 'side'
});
let nextID = 1;
//Массив квестов
const quests = ref([]);
const mainQuests = computed(() => {
    return quests.value.filter(quest => quest.type === QuestTypes.MAIN);
});
const sideQuests = computed(() => {
    return quests.value.filter(quest => quest.type === QuestTypes.SIDE);
});
function makeQuest(type) {
    return {
        label: 'Безымянный квест' + nextID,
        id: nextID++,
        type,
    };
}
//Добавляет новый главный квест в массив квестов.
//Вставку осуществляет перед первым сайд-квестом, либо в конце массива, если
//сайд-квестов нет.
//Закрывает меню добавления.
const addMainQuest = () => {
    //Ищем первый элемент с типом "side"
    //Гарантируется, что мы будем хранить сначала главные квесты, а потом сайд-квесты
    let result = quests.value.findIndex(quest => quest.type === QuestTypes.SIDE);
    if (result == -1)
        quests.value.push(makeQuest(QuestTypes.MAIN));
    else
        quests.value.splice(result, 0, makeQuest(QuestTypes.MAIN));
    isMenuOpen.value = false;
};
const addSideQuest = () => {
    quests.value.push(makeQuest(QuestTypes.SIDE));
    isMenuOpen.value = false;
};
//Удаляет квест из массива.
const removeQuest = (index) => {
    quests.value.splice(index, 1);
};
//Для сворачивания/разворачивания блоков
const isMainQuestsListOpen = ref(true);
const toggleMainQuests = () => {
    isMainQuestsListOpen.value = !isMainQuestsListOpen.value;
    console.log(isMainQuestsListOpen.value);
};
const isSideQuestsListOpen = ref(true);
const toggleSideQuests = () => {
    isSideQuestsListOpen.value = !isSideQuestsListOpen.value;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['tasks-block']} */ ;
/** @type {__VLS_StyleScopedClasses['add-quest-menu']} */ ;
/** @type {__VLS_StyleScopedClasses['add-button']} */ ;
/** @type {__VLS_StyleScopedClasses['tasks-block']} */ ;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "tasks-block" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "justify" },
});
/** @type {[typeof AddingImageButton, typeof AddingImageButton, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(AddingImageButton, new AddingImageButton({
    ...{ 'onClick': {} },
    buttonText: "Добавить квест",
    imageUrl: "/img/parchment.png",
    'aria-expanded': (__VLS_ctx.isMenuOpen),
    ref: "addQuestButtonRef",
}));
const __VLS_1 = __VLS_0({
    ...{ 'onClick': {} },
    buttonText: "Добавить квест",
    imageUrl: "/img/parchment.png",
    'aria-expanded': (__VLS_ctx.isMenuOpen),
    ref: "addQuestButtonRef",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
const __VLS_5 = ({ click: {} },
    { onClick: (__VLS_ctx.toggleMenu) });
/** @type {typeof __VLS_ctx.addQuestButtonRef} */ ;
var __VLS_6 = {};
// @ts-ignore
[isMenuOpen, toggleMenu, addQuestButtonRef,];
var __VLS_2;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    id: "menu",
    ref: "menuRef",
    role: "menu",
    ...{ class: "add-quest-menu" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.isMenuOpen) }, null, null);
/** @type {typeof __VLS_ctx.menuRef} */ ;
// @ts-ignore
[isMenuOpen, menuRef,];
__VLS_asFunctionalElement(__VLS_elements.p, __VLS_elements.p)({});
__VLS_asFunctionalElement(__VLS_elements.br)({});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.addMainQuest) },
    ...{ class: "add-button" },
    ...{ style: {} },
    id: "main-quest-button",
});
// @ts-ignore
[addMainQuest,];
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (__VLS_ctx.addSideQuest) },
    ...{ class: "add-button" },
    ...{ style: {} },
    id: "sub-quest-button",
});
// @ts-ignore
[addSideQuest,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "quests-container" },
});
/** @type {[typeof QuestsBlock, typeof QuestsBlock, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(QuestsBlock, new QuestsBlock({
    ...{ 'onRemoveQuest': {} },
    ...{ 'onToggleList': {} },
    isListOpen: (__VLS_ctx.isMainQuestsListOpen),
    button_text: ('Основные квесты'),
    quests_array: (__VLS_ctx.mainQuests),
    indexAdjustment: (0),
}));
const __VLS_10 = __VLS_9({
    ...{ 'onRemoveQuest': {} },
    ...{ 'onToggleList': {} },
    isListOpen: (__VLS_ctx.isMainQuestsListOpen),
    button_text: ('Основные квесты'),
    quests_array: (__VLS_ctx.mainQuests),
    indexAdjustment: (0),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
const __VLS_14 = ({ removeQuest: {} },
    { onRemoveQuest: (__VLS_ctx.removeQuest) });
const __VLS_15 = ({ toggleList: {} },
    { onToggleList: (__VLS_ctx.toggleMainQuests) });
// @ts-ignore
[isMainQuestsListOpen, mainQuests, removeQuest, toggleMainQuests,];
var __VLS_11;
/** @type {[typeof QuestsBlock, typeof QuestsBlock, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(QuestsBlock, new QuestsBlock({
    ...{ 'onRemoveQuest': {} },
    ...{ 'onToggleList': {} },
    isListOpen: (__VLS_ctx.isSideQuestsListOpen),
    button_text: ('Побочные квесты'),
    quests_array: (__VLS_ctx.sideQuests),
    indexAdjustment: (__VLS_ctx.mainQuests.length),
}));
const __VLS_18 = __VLS_17({
    ...{ 'onRemoveQuest': {} },
    ...{ 'onToggleList': {} },
    isListOpen: (__VLS_ctx.isSideQuestsListOpen),
    button_text: ('Побочные квесты'),
    quests_array: (__VLS_ctx.sideQuests),
    indexAdjustment: (__VLS_ctx.mainQuests.length),
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_20;
let __VLS_21;
const __VLS_22 = ({ removeQuest: {} },
    { onRemoveQuest: (__VLS_ctx.removeQuest) });
const __VLS_23 = ({ toggleList: {} },
    { onToggleList: (__VLS_ctx.toggleSideQuests) });
// @ts-ignore
[mainQuests, removeQuest, isSideQuestsListOpen, sideQuests, toggleSideQuests,];
var __VLS_19;
/** @type {__VLS_StyleScopedClasses['tasks-block']} */ ;
/** @type {__VLS_StyleScopedClasses['justify']} */ ;
/** @type {__VLS_StyleScopedClasses['add-quest-menu']} */ ;
/** @type {__VLS_StyleScopedClasses['add-button']} */ ;
/** @type {__VLS_StyleScopedClasses['add-button']} */ ;
/** @type {__VLS_StyleScopedClasses['quests-container']} */ ;
// @ts-ignore
var __VLS_7 = __VLS_6;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=TasksBlock.vue.js.map