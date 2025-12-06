import TaskDialogLine from "../TaskComponent/TaskDialogLine.vue";
import { onMounted, ref } from "vue";
const props = defineProps();
const emits = defineEmits(['addTask', 'close']);
//targetID - ID квеста, в который добавляем
const selectTask = (taskType, targetId) => {
    emits('addTask', taskType, targetId);
    emits('close');
};
// Генерируем id для диалога на основе questId из пропсов
const dialogId = ref("taskDialog" + props.questId.toString());
const dialogRef = ref(undefined);
onMounted(() => {
    if (dialogRef.value)
        dialogRef.value.showModal();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['task-dialog']} */ ;
__VLS_asFunctionalElement(__VLS_elements.dialog, __VLS_elements.dialog)({
    ...{ class: "task-dialog" },
    id: (__VLS_ctx.dialogId),
    ref: "dialogRef",
});
/** @type {typeof __VLS_ctx.dialogRef} */ ;
// @ts-ignore
[dialogId, dialogRef,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "row" },
});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('close');
            // @ts-ignore
            [$emit,];
        } },
    ...{ class: "close-button" },
});
/** @type {[typeof TaskDialogLine, typeof TaskDialogLine, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(TaskDialogLine, new TaskDialogLine({
    ...{ 'onClick': {} },
    headerText: "Простая задача",
    descrText: "Задача, требующая только выполнения, когда придёт час",
    exampleText: "Например, &quot;купить сапоги&quot;",
}));
const __VLS_1 = __VLS_0({
    ...{ 'onClick': {} },
    headerText: "Простая задача",
    descrText: "Задача, требующая только выполнения, когда придёт час",
    exampleText: "Например, &quot;купить сапоги&quot;",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
const __VLS_5 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.selectTask('simple', __VLS_ctx.questId);
            // @ts-ignore
            [selectTask, questId,];
        } });
var __VLS_2;
/** @type {[typeof TaskDialogLine, typeof TaskDialogLine, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(TaskDialogLine, new TaskDialogLine({
    ...{ 'onClick': {} },
    headerText: "Циклическая задача",
    descrText: "Задача, требующая повторения одного и того же действия до победного конца",
    exampleText: "Например, &quot;Поесть 3 раза&quot;",
}));
const __VLS_8 = __VLS_7({
    ...{ 'onClick': {} },
    headerText: "Циклическая задача",
    descrText: "Задача, требующая повторения одного и того же действия до победного конца",
    exampleText: "Например, &quot;Поесть 3 раза&quot;",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
let __VLS_10;
let __VLS_11;
const __VLS_12 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.selectTask('cycle', __VLS_ctx.questId);
            // @ts-ignore
            [selectTask, questId,];
        } });
var __VLS_9;
/** @type {[typeof TaskDialogLine, typeof TaskDialogLine, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(TaskDialogLine, new TaskDialogLine({
    ...{ 'onClick': {} },
    headerText: "Задача с дедлайном",
    descrText: "\u0417\u0430\u0434\u0430\u0447\u0430\u002c\u0020\u043a\u043e\u0442\u043e\u0440\u0443\u044e\u0020\u043d\u0430\u0434\u043e\u0020\u0443\u0441\u043f\u0435\u0442\u044c\u0020\u0432\u044b\u043f\u043e\u043b\u043d\u0438\u0442\u044c\u002c\u0020\u0447\u0442\u043e\u0431\u044b\u0020\u043d\u0435\u0020\u0432\u0441\u0442\u0440\u0435\u0442\u0438\u0442\u044c\u0441\u044f\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0441\u0020\u043f\u043e\u0441\u043b\u0435\u0434\u0441\u0442\u0432\u0438\u044f\u043c\u0438\u0020\u0441\u0432\u043e\u0435\u0439\u0020\u043c\u0435\u0434\u043b\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u0438",
    exampleText: "Например, &quot;Сдать работы до 30.12.2025&quot;",
}));
const __VLS_15 = __VLS_14({
    ...{ 'onClick': {} },
    headerText: "Задача с дедлайном",
    descrText: "\u0417\u0430\u0434\u0430\u0447\u0430\u002c\u0020\u043a\u043e\u0442\u043e\u0440\u0443\u044e\u0020\u043d\u0430\u0434\u043e\u0020\u0443\u0441\u043f\u0435\u0442\u044c\u0020\u0432\u044b\u043f\u043e\u043b\u043d\u0438\u0442\u044c\u002c\u0020\u0447\u0442\u043e\u0431\u044b\u0020\u043d\u0435\u0020\u0432\u0441\u0442\u0440\u0435\u0442\u0438\u0442\u044c\u0441\u044f\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0441\u0020\u043f\u043e\u0441\u043b\u0435\u0434\u0441\u0442\u0432\u0438\u044f\u043c\u0438\u0020\u0441\u0432\u043e\u0435\u0439\u0020\u043c\u0435\u0434\u043b\u0438\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u0438",
    exampleText: "Например, &quot;Сдать работы до 30.12.2025&quot;",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
let __VLS_17;
let __VLS_18;
const __VLS_19 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.selectTask('deadline', __VLS_ctx.questId);
            // @ts-ignore
            [selectTask, questId,];
        } });
var __VLS_16;
/** @type {[typeof TaskDialogLine, typeof TaskDialogLine, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(TaskDialogLine, new TaskDialogLine({
    ...{ 'onClick': {} },
    headerText: "Монотонная задача",
    descrText: "\u041f\u0435\u0440\u0438\u043e\u0434\u0438\u0447\u0435\u0441\u043a\u0438\u0439\u0020\u0432\u0430\u0440\u0438\u0430\u043d\u0442\u0020\u0446\u0438\u043a\u043b\u0438\u0447\u0435\u0441\u043a\u043e\u0439\u0020\u0437\u0430\u0434\u0430\u0447\u0438\u002e\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0020\u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f\u0020\u043e\u0434\u0438\u043d\u0430\u043a\u043e\u0432\u044b\u0445\u0020\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439\u0020\u0437\u0430\u0020\u043e\u043f\u0440\u0435\u0434\u0435\u043b\u0451\u043d\u043d\u044b\u0439\u0020\u043f\u0435\u0440\u0438\u043e\u0434\u002e\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u041d\u0435\u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0435\u0020\u043f\u0440\u0435\u0440\u044b\u0432\u0430\u0435\u0442\u0020\u0441\u0435\u0440\u0438\u044e\u0021",
    exampleText: "Например, &quot;Тренироваться каждый день 7 раз&quot;",
}));
const __VLS_22 = __VLS_21({
    ...{ 'onClick': {} },
    headerText: "Монотонная задача",
    descrText: "\u041f\u0435\u0440\u0438\u043e\u0434\u0438\u0447\u0435\u0441\u043a\u0438\u0439\u0020\u0432\u0430\u0440\u0438\u0430\u043d\u0442\u0020\u0446\u0438\u043a\u043b\u0438\u0447\u0435\u0441\u043a\u043e\u0439\u0020\u0437\u0430\u0434\u0430\u0447\u0438\u002e\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0020\u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f\u0020\u043e\u0434\u0438\u043d\u0430\u043a\u043e\u0432\u044b\u0445\u0020\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439\u0020\u0437\u0430\u0020\u043e\u043f\u0440\u0435\u0434\u0435\u043b\u0451\u043d\u043d\u044b\u0439\u0020\u043f\u0435\u0440\u0438\u043e\u0434\u002e\u000a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u041d\u0435\u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0435\u0020\u043f\u0440\u0435\u0440\u044b\u0432\u0430\u0435\u0442\u0020\u0441\u0435\u0440\u0438\u044e\u0021",
    exampleText: "Например, &quot;Тренироваться каждый день 7 раз&quot;",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
let __VLS_24;
let __VLS_25;
const __VLS_26 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.selectTask('monotonous', __VLS_ctx.questId);
            // @ts-ignore
            [selectTask, questId,];
        } });
var __VLS_23;
/** @type {__VLS_StyleScopedClasses['task-dialog']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['close-button']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    emits: {},
    __typeProps: {},
});
export default {};
//# sourceMappingURL=TaskDialog.vue.js.map