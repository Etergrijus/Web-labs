import SimpleImageButton from "../Design/SimpleImageButton.vue";
const props = defineProps();
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
    ...{ style: {} },
});
(__VLS_ctx.taskData.needfulCount);
// @ts-ignore
[taskData,];
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "task-header-text in-row-margin" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "task-header-text in-row-margin" },
    ...{ style: {} },
});
(__VLS_ctx.taskData.periodValue);
// @ts-ignore
[taskData,];
__VLS_asFunctionalElement(__VLS_elements.select, __VLS_elements.select)({
    value: (__VLS_ctx.taskData.periodMeasureUnit),
    name: "periods",
    ...{ class: "in-row-margin" },
    disabled: true,
});
// @ts-ignore
[taskData,];
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "minute",
});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "hour",
});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "day",
});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "week",
});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "month",
});
__VLS_asFunctionalElement(__VLS_elements.option, __VLS_elements.option)({
    value: "year",
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "row flex_wrap" },
});
for (const [n] of __VLS_getVForSourceType((__VLS_ctx.taskData.needfulCount))) {
    // @ts-ignore
    [taskData,];
    __VLS_asFunctionalElement(__VLS_elements.input)({
        type: "checkbox",
        ...{ class: "checkbox" },
        key: ('checkbox' + n),
    });
}
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
/** @type {__VLS_StyleScopedClasses['task-header-text']} */ ;
/** @type {__VLS_StyleScopedClasses['in-row-margin']} */ ;
/** @type {__VLS_StyleScopedClasses['task-header-text']} */ ;
/** @type {__VLS_StyleScopedClasses['in-row-margin']} */ ;
/** @type {__VLS_StyleScopedClasses['in-row-margin']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['flex_wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['checkbox']} */ ;
/** @type {__VLS_StyleScopedClasses['task-buttons']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
//# sourceMappingURL=MonotonousTask.vue.js.map