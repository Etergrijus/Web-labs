import QuestsList from "./QuestsList.vue";
import SimpleImageButton from "../Design/SimpleImageButton.vue";
import { ref } from "vue";
import TaskDialog from "../TaskComponent/TaskDialog.vue";
const props = defineProps();
const emit = defineEmits(['removeQuest', 'toggleList']);
const handleRemove = (localIndex) => {
    const correctIndex = localIndex + props.indexAdjustment;
    emit('removeQuest', correctIndex);
};
// Храним не флаг видимости списка, а ID квеста, для которого открыто окно
const openDialogQuestId = ref(null);
const isDialogOpen = ref(false);
const openDialog = (questId) => {
    openDialogQuestId.value = questId;
    isDialogOpen.value = true;
    //Обманываем наблюдатель добавления задачи в квест.
    //Обнуляем значение этой задачи, чтобы наблюдатель всегда ловил триггер
    //И можно было без проблем добавлять одинаковые задачи подряд.
    addingTask.value = undefined;
    targetQuestId.value = null;
};
const closeDialog = () => {
    openDialogQuestId.value = null;
    isDialogOpen.value = false;
};
const addingTask = ref("");
const targetQuestId = ref(null);
const handleAddTask = (taskType, targetId) => {
    addingTask.value = taskType;
    targetQuestId.value = targetId;
};
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
if (__VLS_ctx.quests_array.length) {
    // @ts-ignore
    [quests_array,];
    /** @type {[typeof SimpleImageButton, typeof SimpleImageButton, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(SimpleImageButton, new SimpleImageButton({
        ...{ 'onClick': {} },
        buttonText: (__VLS_ctx.button_text),
        imageUrl: "/img/tape.png",
        font_size: (48),
        image_width: (1200),
    }));
    const __VLS_1 = __VLS_0({
        ...{ 'onClick': {} },
        buttonText: (__VLS_ctx.button_text),
        imageUrl: "/img/tape.png",
        font_size: (48),
        image_width: (1200),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_3;
    let __VLS_4;
    const __VLS_5 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(__VLS_ctx.quests_array.length))
                    return;
                __VLS_ctx.$emit('toggleList');
                // @ts-ignore
                [button_text, $emit,];
            } });
    var __VLS_2;
}
for (const [quest, index] of __VLS_getVForSourceType((__VLS_ctx.quests_array))) {
    // @ts-ignore
    [quests_array,];
    /** @type {[typeof QuestsList, typeof QuestsList, ]} */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(QuestsList, new QuestsList({
        ...{ 'onRemoveQuest': {} },
        ...{ 'onOnOpenDialog': {} },
        key: (quest.id),
        index: (index),
        quest: (quest),
        addingTask: (__VLS_ctx.addingTask),
        targetId: (__VLS_ctx.targetQuestId),
    }));
    const __VLS_8 = __VLS_7({
        ...{ 'onRemoveQuest': {} },
        ...{ 'onOnOpenDialog': {} },
        key: (quest.id),
        index: (index),
        quest: (quest),
        addingTask: (__VLS_ctx.addingTask),
        targetId: (__VLS_ctx.targetQuestId),
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    let __VLS_10;
    let __VLS_11;
    const __VLS_12 = ({ removeQuest: {} },
        { onRemoveQuest: (...[$event]) => {
                __VLS_ctx.handleRemove(index);
                // @ts-ignore
                [addingTask, targetQuestId, handleRemove,];
            } });
    const __VLS_13 = ({ onOpenDialog: {} },
        { onOnOpenDialog: (__VLS_ctx.openDialog) });
    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.isListOpen) }, null, null);
    // @ts-ignore
    [openDialog, isListOpen,];
    var __VLS_9;
}
if (__VLS_ctx.openDialogQuestId) {
    // @ts-ignore
    [openDialogQuestId,];
    /** @type {[typeof TaskDialog, typeof TaskDialog, ]} */ ;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent(TaskDialog, new TaskDialog({
        ...{ 'onClose': {} },
        ...{ 'onAddTask': {} },
        isOpen: (__VLS_ctx.isDialogOpen),
        questId: (__VLS_ctx.openDialogQuestId),
    }));
    const __VLS_16 = __VLS_15({
        ...{ 'onClose': {} },
        ...{ 'onAddTask': {} },
        isOpen: (__VLS_ctx.isDialogOpen),
        questId: (__VLS_ctx.openDialogQuestId),
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    let __VLS_18;
    let __VLS_19;
    const __VLS_20 = ({ close: {} },
        { onClose: (__VLS_ctx.closeDialog) });
    const __VLS_21 = ({ addTask: {} },
        { onAddTask: (__VLS_ctx.handleAddTask) });
    // @ts-ignore
    [openDialogQuestId, isDialogOpen, closeDialog, handleAddTask,];
    var __VLS_17;
}
const __VLS_export = (await import('vue')).defineComponent({
    emits: {},
    __typeProps: {},
});
export default {};
//# sourceMappingURL=QuestsBlock.vue.js.map