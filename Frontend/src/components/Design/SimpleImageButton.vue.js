import { computed } from "vue";
const props = defineProps();
const emits = defineEmits(['click']);
const dynamicButtonStyles = computed(() => {
    const styles = {
        backgroundImage: `url(${props.imageUrl})`,
        fontSize: '28px',
        width: '400px',
        height: '200px',
        backgroundSize: '100% 100%'
    };
    if (props.font_size !== undefined) {
        styles.fontSize = `${props.font_size}px`;
    }
    if (props.image_width !== undefined) {
        styles.width = `${props.image_width}px`;
    }
    if (props.image_height !== undefined) {
        styles.height = `${props.image_height}px`;
    }
    return styles;
});
const dynamicTextStyle = computed(() => {
    const styles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: '\'Allegreto\', serif',
        color: '#000',
    };
    if (props.font_family !== undefined) {
        styles.fontFamily = `\'${props.font_family}\', Serif`;
    }
    if (props.font_color !== undefined) {
        styles.color = `${props.font_color}`;
    }
    if (props.top_ !== undefined) {
        styles.top = `${props.top_}%`;
    }
    if (props.left_ !== undefined) {
        styles.left = `${props.left_}%`;
    }
    return styles;
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
/** @type {__VLS_StyleScopedClasses['scroll-button']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-button']} */ ;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.$emit('click');
            // @ts-ignore
            [$emit,];
        } },
    ...{ class: "scroll-button" },
    type: "button",
    ...{ style: (__VLS_ctx.dynamicButtonStyles) },
});
// @ts-ignore
[dynamicButtonStyles,];
__VLS_asFunctionalElement(__VLS_elements.span, __VLS_elements.span)({
    ...{ class: "scroll-text" },
    ...{ style: (__VLS_ctx.dynamicTextStyle) },
});
// @ts-ignore
[dynamicTextStyle,];
(__VLS_ctx.buttonText);
// @ts-ignore
[buttonText,];
/** @type {__VLS_StyleScopedClasses['scroll-button']} */ ;
/** @type {__VLS_StyleScopedClasses['scroll-text']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    emits: {},
    __typeProps: {},
});
export default {};
//# sourceMappingURL=SimpleImageButton.vue.js.map