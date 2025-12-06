import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import router from "../router";
import { updateTooltipPosition } from "../composables/authFunctions";
import AuthBlock from "../components/Advanced/AuthBlock.vue";
const login = ref('');
const password = ref('');
const loginError = ref(false);
const passwordError = ref(false);
const loginKeyUp = async () => {
    loginError.value = login.value.trim().length === 0;
    if (loginError.value) {
        await nextTick();
        await updateTooltipPosition(loginError.value, loginInputRef.value, loginSpanRef.value);
    }
};
const passwordKeyUp = async () => {
    passwordError.value = password.value.trim().length === 0;
    if (passwordError.value) {
        await nextTick();
        await updateTooltipPosition(passwordError.value, passwordInputRef.value, passwordSpanRef.value);
    }
};
//Проверяем форму, чтобы значения были не пустыми
const submitForm = async (event) => {
    event.preventDefault();
    loginError.value = false;
    passwordError.value = false;
    if (login.value.trim().length === 0) {
        loginError.value = true;
        await nextTick();
        await updateTooltipPosition(loginError.value, loginInputRef.value, loginSpanRef.value);
    }
    if (password.value.trim().length === 0) {
        passwordError.value = true;
        await nextTick();
        await updateTooltipPosition(passwordError.value, passwordInputRef.value, passwordSpanRef.value);
    }
    if (!(loginError.value || passwordError.value)) {
        await nextTick();
        await router.push('/content');
    }
};
const loginInputRef = ref(null);
const loginSpanRef = ref(null);
const passwordInputRef = ref(null);
const passwordSpanRef = ref(null);
//Рефы на аутх-блоки
//Отсюда будем получать рефы на input и span каждого блока
const loginAuthBlockRef = ref(null);
const passwordAuthBlockRef = ref(null);
watch(loginAuthBlockRef, (newRef) => {
    if (newRef) { // Если экземпляр компонента AuthBlock теперь доступен
        // newRef.inputRef - это экспортированный ref из AuthBlock
        loginInputRef.value = newRef.inputRef; // Присваиваем его к нашему рефу в родителе
        loginSpanRef.value = newRef.spanRef; // То же самое для span
    }
});
watch(passwordAuthBlockRef, (newRef) => {
    if (newRef) {
        passwordInputRef.value = newRef.inputRef;
        passwordSpanRef.value = newRef.spanRef;
    }
});
onMounted(() => {
    window.addEventListener('resize', () => {
        updateTooltipPosition(loginError.value, loginInputRef.value, loginSpanRef.value);
    });
    window.addEventListener('resize', () => {
        updateTooltipPosition(passwordError.value, passwordInputRef.value, passwordSpanRef.value);
    });
});
onUnmounted(() => {
    window.removeEventListener('resize', () => {
        updateTooltipPosition(loginError.value, loginInputRef.value, loginSpanRef.value);
    });
    window.removeEventListener('resize', () => {
        updateTooltipPosition(passwordError.value, passwordInputRef.value, passwordSpanRef.value);
    });
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "auth-text-header" },
});
__VLS_asFunctionalElement(__VLS_elements.h1, __VLS_elements.h1)({
    ...{ class: "welcome-text" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "auth-block" },
});
__VLS_asFunctionalElement(__VLS_elements.form, __VLS_elements.form)({
    ...{ onSubmit: (__VLS_ctx.submitForm) },
    action: "/login",
    method: "post",
});
// @ts-ignore
[submitForm,];
/** @type {[typeof AuthBlock, typeof AuthBlock, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(AuthBlock, new AuthBlock({
    ...{ 'onInputKeyUp': {} },
    id: "login",
    type: "text",
    label_text: "Имя пользователя:",
    modelValue: (__VLS_ctx.login),
    span_show: (__VLS_ctx.loginError),
    span_text: "Введите имя пользователя",
    ref: "loginAuthBlockRef",
}));
const __VLS_1 = __VLS_0({
    ...{ 'onInputKeyUp': {} },
    id: "login",
    type: "text",
    label_text: "Имя пользователя:",
    modelValue: (__VLS_ctx.login),
    span_show: (__VLS_ctx.loginError),
    span_text: "Введите имя пользователя",
    ref: "loginAuthBlockRef",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
let __VLS_3;
let __VLS_4;
const __VLS_5 = ({ inputKeyUp: {} },
    { onInputKeyUp: (__VLS_ctx.loginKeyUp) });
/** @type {typeof __VLS_ctx.loginAuthBlockRef} */ ;
var __VLS_6 = {};
// @ts-ignore
[login, loginError, loginKeyUp, loginAuthBlockRef,];
var __VLS_2;
/** @type {[typeof AuthBlock, typeof AuthBlock, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(AuthBlock, new AuthBlock({
    ...{ 'onInputKeyUp': {} },
    id: "password",
    type: "password",
    label_text: "Пароль:",
    modelValue: (__VLS_ctx.password),
    span_show: (__VLS_ctx.passwordError),
    span_text: "Введите пароль",
    ref: "passwordAuthBlockRef",
}));
const __VLS_10 = __VLS_9({
    ...{ 'onInputKeyUp': {} },
    id: "password",
    type: "password",
    label_text: "Пароль:",
    modelValue: (__VLS_ctx.password),
    span_show: (__VLS_ctx.passwordError),
    span_text: "Введите пароль",
    ref: "passwordAuthBlockRef",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
const __VLS_14 = ({ inputKeyUp: {} },
    { onInputKeyUp: (__VLS_ctx.passwordKeyUp) });
/** @type {typeof __VLS_ctx.passwordAuthBlockRef} */ ;
var __VLS_15 = {};
// @ts-ignore
[password, passwordError, passwordKeyUp, passwordAuthBlockRef,];
var __VLS_11;
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    type: "submit",
    ...{ class: "default-button" },
});
const __VLS_18 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    to: "/",
    ...{ class: "default-button" },
}));
const __VLS_20 = __VLS_19({
    to: "/",
    ...{ class: "default-button" },
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
const { default: __VLS_22 } = __VLS_21.slots;
var __VLS_21;
/** @type {__VLS_StyleScopedClasses['auth-text-header']} */ ;
/** @type {__VLS_StyleScopedClasses['welcome-text']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-block']} */ ;
/** @type {__VLS_StyleScopedClasses['default-button']} */ ;
/** @type {__VLS_StyleScopedClasses['default-button']} */ ;
// @ts-ignore
var __VLS_7 = __VLS_6, __VLS_16 = __VLS_15;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=LoginView.vue.js.map