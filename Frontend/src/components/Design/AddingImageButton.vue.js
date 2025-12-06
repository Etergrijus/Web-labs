import { ref } from "vue";
const props = defineProps();
const emits = defineEmits(['click']);
const localButtonRef = ref(null);
const __VLS_exposed = {
    buttonRef: localButtonRef,
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
/** @type {__VLS_StyleScopedClasses['scroll-button']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-text']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-button']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-button']} */ ;
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('click');
            // @ts-ignore
            [$emit,];
        } },
    ...{ class: "scroll-button" },
    ref: "localButtonRef",
    type: "button",
    'aria-expanded': (__VLS_ctx.ariaExpanded),
    ...{ style: ({ backgroundImage: `url(${__VLS_ctx.imageUrl})` }) },
});
/** @type {typeof __VLS_ctx.localButtonRef} */ ;
// @ts-ignore
[ariaExpanded, imageUrl, localButtonRef,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "scroll-text" },
});
(__VLS_ctx.buttonText);
// @ts-ignore
[buttonText,];
/** @type {__VLS_StyleScopedClasses['scroll-button']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-text']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    emits: {},
    __typeProps: {},
});
export default {};
//# sourceMappingURL=AddingImageButton.vue.js.map