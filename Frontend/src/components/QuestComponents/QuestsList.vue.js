import { computed, ref, watch } from "vue";
import SimpleImageButton from "../Design/SimpleImageButton.vue";
import SimpleTask from "../TaskComponent/SimpleTask.vue";
import CycleTask from "../TaskComponent/CycleTask.vue";
import DeadlineTask from "../TaskComponent/DeadlineTask.vue";
import MonotonousTask from "../TaskComponent/MonotonousTask.vue";
const props = defineProps();
const labelId = computed(() => `quest-label-${props.index}`);
const btnId = computed(() => `quest-button-${props.index}`);
const emit = defineEmits(['removeQuest', 'onOpenDialog']);
const removeQuest_ = () => {
    emit('removeQuest', props.index);
};
const TaskTypes = Object.freeze({
    SIMPLE: 'simple',
    CYCLE: 'cycle',
    DEADLINE: 'deadline',
    MONOTONOUS: 'monotonous'
});
const questTasks = ref([]);
let nextId = 1;
const componentNamesMap = {
    [TaskTypes.SIMPLE]: SimpleTask,
    [TaskTypes.CYCLE]: CycleTask,
    [TaskTypes.DEADLINE]: DeadlineTask,
    [TaskTypes.MONOTONOUS]: MonotonousTask
};
const addTask = (taskType) => {
    //Смешная херня, чтобы TypeScript не ругался
    //Ужас-ужас, зато будет билдиться
    let componentName;
    let defaultTaskData;
    switch (taskType) {
        case TaskTypes.SIMPLE:
            componentName = componentNamesMap[TaskTypes.SIMPLE];
            break;
        case TaskTypes.CYCLE:
            componentName = componentNamesMap[TaskTypes.CYCLE];
            defaultTaskData = { needfulCount: 1, doneCount: 0 };
            break;
        case TaskTypes.DEADLINE:
            componentName = componentNamesMap[TaskTypes.DEADLINE];
            //Сначала создаём эту штуку, которая хранит дату в ISO 8601 с учётом UTC,
            //чтобы не париться над часовыми поясами
            const milliseconds = Date.UTC(2030, 0, 1, 0, 0, 0);
            //И делаем из этого дату
            const date = new Date(milliseconds);
            defaultTaskData = { deadlineDate: date.toJSON() };
            break;
        case TaskTypes.MONOTONOUS:
            componentName = componentNamesMap[TaskTypes.MONOTONOUS];
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
    };
    questTasks.value.push(newTask);
};
watch(() => props.addingTask, () => {
    if (props.targetId === props.quest.id) {
        addTask(props.addingTask);
    }
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
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "quest" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    for: (__VLS_ctx.labelId),
    ...{ style: {} },
    contenteditable: "true",
});
// @ts-ignore
[labelId,];
(__VLS_ctx.quest.label);
// @ts-ignore
[quest,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "row quest-row" },
});
/** @type {[typeof SimpleImageButton, typeof SimpleImageButton, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(SimpleImageButton, new SimpleImageButton({
    ...{ 'onClick': {} },
    buttonText: "Добавить задачу",
    imageUrl: "img/parchment.png",
    font_size: (36),
    image_width: (300),
    image_height: (150),
}));
const __VLS_1 = __VLS_0({
    ...{ 'onClick': {} },
    buttonText: "Добавить задачу",
    imageUrl: "img/parchment.png",
    font_size: (36),
    image_width: (300),
    image_height: (150),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
const __VLS_5 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.$emit('onOpenDialog', __VLS_ctx.quest.id);
            // @ts-ignore
            [quest, $emit,];
        } });
var __VLS_2;
/** @type {[typeof SimpleImageButton, typeof SimpleImageButton, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(SimpleImageButton, new SimpleImageButton({
    buttonText: "Выполнить",
    imageUrl: "img/parchment.png",
    font_size: (40),
    image_width: (300),
    image_height: (150),
}));
const __VLS_8 = __VLS_7({
    buttonText: "Выполнить",
    imageUrl: "img/parchment.png",
    font_size: (40),
    image_width: (300),
    image_height: (150),
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
/** @type {[typeof SimpleImageButton, typeof SimpleImageButton, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(SimpleImageButton, new SimpleImageButton({
    ...{ 'onClick': {} },
    buttonText: "Отменить",
    imageUrl: "img/parchment.png",
    font_size: (40),
    image_width: (300),
    image_height: (150),
}));
const __VLS_12 = __VLS_11({
    ...{ 'onClick': {} },
    buttonText: "Отменить",
    imageUrl: "img/parchment.png",
    font_size: (40),
    image_width: (300),
    image_height: (150),
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
let __VLS_14;
let __VLS_15;
const __VLS_16 = ({ click: {} },
    { onClick: (__VLS_ctx.removeQuest_) });
// @ts-ignore
[removeQuest_,];
var __VLS_13;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "task" },
});
for (const [task] of __VLS_getVForSourceType((__VLS_ctx.questTasks))) {
    // @ts-ignore
    [questTasks,];
    const __VLS_18 = ((task.component));
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
        key: (task.id),
        taskData: (task.taskTypeData),
    }));
    const __VLS_20 = __VLS_19({
        key: (task.id),
        taskData: (task.taskTypeData),
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
}
/** @type {__VLS_StyleScopedClasses['quest']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['quest-row']} */ ;
/** @type {__VLS_StyleScopedClasses['task']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    emits: {},
    __typeProps: {},
});
export default {};
//# sourceMappingURL=QuestsList.vue.js.map