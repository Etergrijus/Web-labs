import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DefaultLayout from "../layout/DefaultLayout.vue";
import LoginView from "../views/LoginView.vue";
import EmptyLayout from "../layout/EmptyLayout.vue";
import RegisterView from "../views/RegisterView.vue";
import ContentView from "../views/ContentView.vue";
import ContentLayout from "../layout/ContentLayout.vue";
import ArchiveView from "../views/ArchiveView.vue";
import {Component} from "vue";

declare module 'vue-router' {
  interface RouteMeta {
    // Каждый объект роута может иметь свой объект meta
    // Добавляем сюда все поля, которые вы ожидаете в meta
    layout: Component; // Или другой тип для layout
    title: string;     // Явно указываем, что title - это строка
    // Другие ваши мета-поля, если есть
    // requiresAuth?: boolean;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {layout: DefaultLayout, title: 'Добро пожаловать'}
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {layout: EmptyLayout, title: 'Войти'}
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {layout: EmptyLayout, title: 'Регистрация'}
    },
    {
      path: '/content/:id',
      name: 'content',
      component: ContentView,
      meta: {layout: ContentLayout, title: 'Мои квесты'}
    },
    {
      path: '/archive',
      name: 'archive',
      component: ArchiveView,
      meta: {layout: EmptyLayout, title: 'Моя летопись'}
    }
  ],
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router
