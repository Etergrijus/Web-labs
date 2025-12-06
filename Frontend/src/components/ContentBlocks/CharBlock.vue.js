import { ref } from "vue";
import { useFileDialog } from "@vueuse/core";
import AttributeString from "../Advanced/AttributeString.vue";
import SimpleImageButton from "../Design/SimpleImageButton.vue";
const imageSrc = ref('/img/empty_photo.jpg'); // Реактивная переменная для src
const { files, open, reset, onCancel, onChange } = useFileDialog({
    accept: 'image/*', // Set to accept only image files
    directory: false, // Select directories instead of files if set true
});
onChange(() => {
    if (files.value && files.value.length > 0) {
        const file = files.value[0];
        imageSrc.value = URL.createObjectURL(file);
    }
});
//Переменные для характеристик
const heartValue = ref(0);
const boltValue = ref(0);
const starValue = ref(0);
const gearWheelValue = ref(0);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['char-block']} */ ;
/** @type {__VLS_StyleScopedClasses['char-block']} */ ;
/** @type {__VLS_StyleScopedClasses['attributes-container']} */ ;
/** @type {__VLS_StyleScopedClasses['char-block']} */ ;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "char-block" },
});
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_elements.img)({
    src: (__VLS_ctx.imageSrc),
    width: "400px",
});
// @ts-ignore
[imageSrc,];
/** @type {[typeof SimpleImageButton, typeof SimpleImageButton, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(SimpleImageButton, new SimpleImageButton({
    ...{ 'onClick': {} },
    ...{ style: {} },
    buttonText: "Сменить портрет",
    imageUrl: "img/canvas.png",
    top_: (90),
    font_color: "white",
    image_width: (300),
    font_family: "Silkscreen",
}));
const __VLS_1 = __VLS_0({
    ...{ 'onClick': {} },
    ...{ style: {} },
    buttonText: "Сменить портрет",
    imageUrl: "img/canvas.png",
    top_: (90),
    font_color: "white",
    image_width: (300),
    font_family: "Silkscreen",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
const __VLS_5 = ({ click: {} },
    { onClick: (__VLS_ctx.open) });
// @ts-ignore
[open,];
var __VLS_2;
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "attributes-container" },
});
/** @type {[typeof AttributeString, typeof AttributeString, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(AttributeString, new AttributeString({
    attribute_value: (__VLS_ctx.heartValue),
    attribute_emblem: ('Heart'),
}));
const __VLS_8 = __VLS_7({
    attribute_value: (__VLS_ctx.heartValue),
    attribute_emblem: ('Heart'),
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
// @ts-ignore
[heartValue,];
/** @type {[typeof AttributeString, typeof AttributeString, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(AttributeString, new AttributeString({
    attribute_value: (__VLS_ctx.boltValue),
    attribute_emblem: ('Bolt'),
}));
const __VLS_12 = __VLS_11({
    attribute_value: (__VLS_ctx.boltValue),
    attribute_emblem: ('Bolt'),
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
// @ts-ignore
[boltValue,];
/** @type {[typeof AttributeString, typeof AttributeString, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(AttributeString, new AttributeString({
    attribute_value: (__VLS_ctx.starValue),
    attribute_emblem: ('Star'),
}));
const __VLS_16 = __VLS_15({
    attribute_value: (__VLS_ctx.starValue),
    attribute_emblem: ('Star'),
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
// @ts-ignore
[starValue,];
/** @type {[typeof AttributeString, typeof AttributeString, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(AttributeString, new AttributeString({
    attribute_value: (__VLS_ctx.gearWheelValue),
    attribute_emblem: ('GearWheel'),
}));
const __VLS_20 = __VLS_19({
    attribute_value: (__VLS_ctx.gearWheelValue),
    attribute_emblem: ('GearWheel'),
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
// @ts-ignore
[gearWheelValue,];
/** @type {__VLS_StyleScopedClasses['char-block']} */ ;
/** @type {__VLS_StyleScopedClasses['attributes-container']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=CharBlock.vue.js.map