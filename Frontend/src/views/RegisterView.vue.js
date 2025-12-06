import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import router from "../router";
import { updateTooltipPosition } from "../composables/authFunctions";
import AuthBlock from "../components/Advanced/AuthBlock.vue";
const login = ref('');
const password = ref('');
const checkerPassword = ref('');
const charName = ref('');
const loginError = ref(false);
const passwordError = ref(false);
const checkerPasswordError = ref(false);
const charNameError = ref(false);
const loginInputRef = ref(null);
const loginSpanRef = ref(null);
const passwordInputRef = ref(null);
const passwordSpanRef = ref(null);
const checkerPasswordInputRef = ref(null);
const checkerPasswordSpanRef = ref(null);
const charNameInputRef = ref(null);
const charNameSpanRef = ref(null);
onMounted(() => {
    window.addEventListener('resize', () => {
        updateTooltipPosition(loginError.value, loginInputRef.value, loginSpanRef.value);
    });
    window.addEventListener('resize', () => {
        updateTooltipPosition(passwordError.value, passwordInputRef.value, passwordSpanRef.value);
    });
    window.addEventListener('resize', () => {
        updateTooltipPosition(checkerPasswordError.value, checkerPasswordInputRef.value, checkerPasswordSpanRef.value);
    });
    window.addEventListener('resize', () => {
        updateTooltipPosition(charNameError.value, charNameInputRef.value, charNameSpanRef.value);
    });
});
const errors = [loginError,
    passwordError,
    checkerPasswordError,
    charNameError
];
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
    checkerPasswordError.value = password.value != checkerPassword.value;
    if (checkerPasswordError.value) {
        await nextTick();
        await updateTooltipPosition(checkerPasswordError.value, checkerPasswordInputRef.value, checkerPasswordSpanRef.value);
    }
};
const checkerPasswordKeyUp = async () => {
    checkerPasswordError.value = checkerPassword.value != password.value;
    if (checkerPasswordError.value) {
        await nextTick();
        await updateTooltipPosition(checkerPasswordError.value, checkerPasswordInputRef.value, checkerPasswordSpanRef.value);
    }
};
const charNameKeyUp = async () => {
    charNameError.value = charName.value.trim().length === 0;
    if (charNameError.value) {
        await nextTick();
        await updateTooltipPosition(charNameError.value, charNameInputRef.value, charNameSpanRef.value);
    }
};
const submitForm = async (event) => {
    event.preventDefault();
    for (let error of errors) {
        error.value = false;
    }
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
    if (checkerPassword.value != password.value) {
        checkerPasswordError.value = true;
        await nextTick();
        await updateTooltipPosition(checkerPasswordError.value, checkerPasswordInputRef.value, checkerPasswordSpanRef.value);
    }
    if (charName.value.trim().length === 0) {
        charNameError.value = true;
        await nextTick();
        await updateTooltipPosition(charNameError.value, charNameInputRef.value, charNameSpanRef.value);
    }
    for (let error of errors) {
        if (error.value == true)
            return;
    }
    await nextTick();
    await router.push('/content');
};
//Рефы на аутх-блоки
//Отсюда будем получать рефы на input и span каждого блока
const loginAuthBlockRef = ref(null);
watch(loginAuthBlockRef, (newRef) => {
    if (newRef) { // Если экземпляр компонента AuthBlock теперь доступен
        // newRef.inputRef - это экспортированный ref из AuthBlock
        loginInputRef.value = newRef.inputRef; // Присваиваем его к нашему рефу в родителе
        loginSpanRef.value = newRef.spanRef; // То же самое для span
    }
});
const passwordAuthBlockRef = ref(null);
watch(passwordAuthBlockRef, (newRef) => {
    if (newRef) {
        passwordInputRef.value = newRef.inputRef;
        passwordSpanRef.value = newRef.spanRef;
    }
});
const checkerPasswordAuthBlockRef = ref(null);
watch(checkerPasswordAuthBlockRef, (newRef) => {
    if (newRef) {
        checkerPasswordInputRef.value = newRef.inputRef;
        checkerPasswordSpanRef.value = newRef.spanRef;
    }
});
const charNameAuthBlockRef = ref(null);
watch(charNameAuthBlockRef, (newRef) => {
    if (newRef) {
        charNameInputRef.value = newRef.inputRef;
        charNameSpanRef.value = newRef.spanRef;
    }
});
onUnmounted(() => {
    window.removeEventListener('resize', () => {
        updateTooltipPosition(loginError.value, loginInputRef.value, loginSpanRef.value);
    });
    window.removeEventListener('resize', () => {
        updateTooltipPosition(passwordError.value, passwordInputRef.value, passwordSpanRef.value);
    });
    window.removeEventListener('resize', () => {
        updateTooltipPosition(checkerPasswordError.value, checkerPasswordInputRef.value, checkerPasswordSpanRef.value);
    });
    window.removeEventListener('resize', () => {
        updateTooltipPosition(charNameError.value, charNameInputRef.value, charNameSpanRef.value);
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
__VLS_asFunctionalElement(__VLS_elements.br)({});
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
/** @type {[typeof AuthBlock, typeof AuthBlock, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(AuthBlock, new AuthBlock({
    ...{ 'onInputKeyUp': {} },
    id: "password-check",
    type: "password",
    label_text: "Подтвердите пароль:",
    modelValue: (__VLS_ctx.checkerPassword),
    span_show: (__VLS_ctx.checkerPasswordError),
    span_text: "Пароли не совпадают",
    ref: "checkerPasswordAuthBlockRef",
}));
const __VLS_19 = __VLS_18({
    ...{ 'onInputKeyUp': {} },
    id: "password-check",
    type: "password",
    label_text: "Подтвердите пароль:",
    modelValue: (__VLS_ctx.checkerPassword),
    span_show: (__VLS_ctx.checkerPasswordError),
    span_text: "Пароли не совпадают",
    ref: "checkerPasswordAuthBlockRef",
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
let __VLS_21;
let __VLS_22;
const __VLS_23 = ({ inputKeyUp: {} },
    { onInputKeyUp: (__VLS_ctx.checkerPasswordKeyUp) });
/** @type {typeof __VLS_ctx.checkerPasswordAuthBlockRef} */ ;
var __VLS_24 = {};
// @ts-ignore
[checkerPassword, checkerPasswordError, checkerPasswordKeyUp, checkerPasswordAuthBlockRef,];
var __VLS_20;
/** @type {[typeof AuthBlock, typeof AuthBlock, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(AuthBlock, new AuthBlock({
    ...{ 'onInputKeyUp': {} },
    id: "char-name",
    type: "text",
    label_text: (`Введите имя персонажа:<br>
        <em><sub> (В диапазоне от вашего ФИО до &quot;Мы, император и самодержец&quot;)</sub></em>`),
    modelValue: (__VLS_ctx.charName),
    span_show: (__VLS_ctx.charNameError),
    span_text: "Введите имя персонажа",
    ref: "charNameAuthBlockRef",
}));
const __VLS_28 = __VLS_27({
    ...{ 'onInputKeyUp': {} },
    id: "char-name",
    type: "text",
    label_text: (`Введите имя персонажа:<br>
        <em><sub> (В диапазоне от вашего ФИО до &quot;Мы, император и самодержец&quot;)</sub></em>`),
    modelValue: (__VLS_ctx.charName),
    span_show: (__VLS_ctx.charNameError),
    span_text: "Введите имя персонажа",
    ref: "charNameAuthBlockRef",
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
let __VLS_30;
let __VLS_31;
const __VLS_32 = ({ inputKeyUp: {} },
    { onInputKeyUp: (__VLS_ctx.charNameKeyUp) });
/** @type {typeof __VLS_ctx.charNameAuthBlockRef} */ ;
var __VLS_33 = {};
// @ts-ignore
[charName, charNameError, charNameKeyUp, charNameAuthBlockRef,];
var __VLS_29;
__VLS_asFunctionalElement(__VLS_elements.button, __VLS_elements.button)({
    type: "submit",
    ...{ class: "default-button" },
});
const __VLS_36 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
RouterLink;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    to: "/",
    ...{ class: "default-button" },
}));
const __VLS_38 = __VLS_37({
    to: "/",
    ...{ class: "default-button" },
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
const { default: __VLS_40 } = __VLS_39.slots;
var __VLS_39;
/** @type {__VLS_StyleScopedClasses['auth-text-header']} */ ;
/** @type {__VLS_StyleScopedClasses['welcome-text']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-block']} */ ;
/** @type {__VLS_StyleScopedClasses['default-button']} */ ;
/** @type {__VLS_StyleScopedClasses['default-button']} */ ;
// @ts-ignore
var __VLS_7 = __VLS_6, __VLS_16 = __VLS_15, __VLS_25 = __VLS_24, __VLS_34 = __VLS_33;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
//# sourceMappingURL=RegisterView.vue.js.map