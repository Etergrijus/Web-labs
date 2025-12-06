import { computed, ref } from "vue";
const props = defineProps();
const emit = defineEmits(['inputKeyUp', 'update:modelValue']);
const local_inputRef = ref(null);
const local_spanRef = ref(null);
const inputModelValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
});
const __VLS_exposed = {
    inputRef: local_inputRef,
    spanRef: local_spanRef,
};
defineExpose(__VLS_exposed);
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
/** @type {__VLS_StyleScopedClasses['tooltip']} */ ;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "input-container" },
});
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    for: (__VLS_ctx.id),
    ...{ class: "edit-label" },
});
__VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.label_text) }, null, null);
// @ts-ignore
[id, label_text,];
__VLS_asFunctionalElement(__VLS_elements.input, __VLS_elements.input)({
    ...{ onKeyup: (...[$event]) => {
            __VLS_ctx.$emit('inputKeyUp');
            // @ts-ignore
            [$emit,];
        } },
    type: (__VLS_ctx.type),
    id: (__VLS_ctx.id),
    name: (__VLS_ctx.id),
    ...{ class: "edit-input" },
    ref: "local_inputRef",
});
(__VLS_ctx.inputModelValue);
/** @type {typeof __VLS_ctx.local_inputRef} */ ;
// @ts-ignore
[id, id, type, inputModelValue, local_inputRef,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "tooltip" },
    ref: "local_spanRef",
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.span_show) }, null, null);
/** @type {typeof __VLS_ctx.local_spanRef} */ ;
// @ts-ignore
[span_show, local_spanRef,];
(__VLS_ctx.span_text);
// @ts-ignore
[span_text,];
/** @type {__VLS_StyleScopedClasses['input-container']} */ ;
/** @type {__VLS_StyleScopedClasses['edit-label']} */ ;
/** @type {__VLS_StyleScopedClasses['edit-input']} */ ;
/** @type {__VLS_StyleScopedClasses['tooltip']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    emits: {},
    __typeProps: {},
});
export default {};
//# sourceMappingURL=AuthBlock.vue.js.map