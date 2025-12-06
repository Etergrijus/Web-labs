import { onMounted, onBeforeUnmount } from "vue";
onMounted(() => {
    const appElement = document.getElementById('app');
    if (appElement)
        appElement.classList.add('empty-layout');
});
onBeforeUnmount(() => {
    const appElement = document.getElementById('app');
    if (appElement) {
        appElement.classList.remove('empty-layout');
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.main, __VLS_elements.main)({});
const __VLS_0 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
// @ts-ignore
RouterView;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=EmptyLayout.vue.js.map