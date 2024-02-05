import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';

import { useKeycloakStore } from '@/stores/keycloakStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'HomePage',
          component: HomeView,
          meta: {
            title: 'Keycloak Konsole'
          }
        }
      ]
    },
    {
      path: '/login',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'LoginPage',
          component: LoginView,
          meta: {
            title: 'Keycloak Konsole Login'
          }
        }
      ]
    }
  ]
});

router.beforeEach((to) => {
  const keycloakInfo = useKeycloakStore();
  if (to.path !== '/login' && keycloakInfo.JWTToken === null) {
    return { name: 'LoginPage' };
  }
});

export default router;
