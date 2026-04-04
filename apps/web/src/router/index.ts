import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'overview',
      component: () => import('@/views/OverviewPage.vue'),
    },
    {
      path: '/button',
      name: 'button',
      component: () => import('@/views/ButtonPage.vue'),
    },
    {
      path: '/textfield',
      name: 'textfield',
      component: () => import('@/views/TextFieldPage.vue'),
    },
    {
      path: '/tokens',
      name: 'tokens',
      component: () => import('@/views/TokensPage.vue'),
    },
  ],
})

export default router