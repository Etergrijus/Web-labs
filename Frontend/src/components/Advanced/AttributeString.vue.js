import { defineAsyncComponent } from "vue";
const props = defineProps();
const AsyncComp = defineAsyncComponent(() => import((`@/components/Drawnings/${props.attribute_emblem}.vue`)));
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
    ...{ class: "attribute-row" },
});
const __VLS_0 = ((__VLS_ctx.AsyncComp));
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
// @ts-ignore
[AsyncComp,];
__VLS_asFunctionalElement(__VLS_elements.label, __VLS_elements.label)({
    ...{ class: "attribute-value-label" },
});
(__VLS_ctx.attribute_value.toString());
// @ts-ignore
[attribute_value,];
/** @type {__VLS_StyleScopedClasses['attribute-row']} */ ;
/** @type {__VLS_StyleScopedClasses['attribute-value-label']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
//# sourceMappingURL=AttributeString.vue.js.map