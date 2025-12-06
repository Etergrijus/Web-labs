import SimpleImageButton from "../Design/SimpleImageButton.vue";
import { computed } from "vue";
const props = defineProps();
const now = computed(() => {
    const date = new Date();
    //0-16 для формата типа 2018-06-12T19:30
    return date.toISOString().slice(0, 16);
});
const formattedDeadlineDate = computed(() => {
    const date = new Date(props.taskData.deadlineDate);
    console.log(date.toISOString().slice(0, 16));
    return date.toISOString().slice(0, 16);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "row task-style" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "column" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "row" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "task-header-text" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "task-header-text in-row-margin" },
});
__VLS_asFunctionalElement(__VLS_elements.input)({
    ...{ onKeydown: () => { } },
    ...{ class: "in-row-margin" },
    type: "datetime-local",
    min: (__VLS_ctx.now),
    value: (__VLS_ctx.formattedDeadlineDate),
    disabled: true,
});
// @ts-ignore
[now, formattedDeadlineDate,];
__VLS_asFunctionalElement(__VLS_elements.input)({
    type: "checkbox",
    ...{ class: "checkbox" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "task-buttons" },
});
/** @type {[typeof SimpleImageButton, typeof SimpleImageButton, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(SimpleImageButton, new SimpleImageButton({
    ...{ style: {} },
    buttonText: "Редактировать",
    imageUrl: "/img/parchment.png",
    font_size: (36),
    image_width: (250),
    image_height: (100),
}));
const __VLS_1 = __VLS_0({
    ...{ style: {} },
    buttonText: "Редактировать",
    imageUrl: "/img/parchment.png",
    font_size: (36),
    image_width: (250),
    image_height: (100),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
/** @type {[typeof SimpleImageButton, typeof SimpleImageButton, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(SimpleImageButton, new SimpleImageButton({
    buttonText: "Отменить",
    imageUrl: "/img/parchment.png",
    font_size: (36),
    image_width: (250),
    image_height: (100),
}));
const __VLS_5 = __VLS_4({
    buttonText: "Отменить",
    imageUrl: "/img/parchment.png",
    font_size: (36),
    image_width: (250),
    image_height: (100),
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['task-style']} */ ;
/** @type {__VLS_StyleScopedClasses['column']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['task-header-text']} */ ;
/** @type {__VLS_StyleScopedClasses['task-header-text']} */ ;
/** @type {__VLS_StyleScopedClasses['in-row-margin']} */ ;
/** @type {__VLS_StyleScopedClasses['in-row-margin']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox']} */ ;
/** @type {__VLS_StyleScopedClasses['task-buttons']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
//# sourceMappingURL=DeadlineTask.vue.js.map