import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import { useUserStore } from '@/entities/user/model/userStore'

const routes = [
  { path: '/', component: () => import('@/pages/home/HomePage.vue') },
  { path: '/auth', component: () => import('@/pages/auth/AuthPage.vue') },
  { path: '/register', component: () => import('@/pages/registration/RegistrationPage.vue') },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/pages/profile/ProfilePage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/ClipsPage',
    name: 'ClipsPage',
    component: () => import('@/pages/clips/ClipsPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/clips/:id',
    name: 'ClipView',
    component: () => import('@/pages/clips/ClipViewPage.vue'),
    meta: { requiresAuth: true },
  },
  { path: '/:pathMatch(.*)*', component: () => import('@/pages/not-found/NotFoundPage.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isAuthenticated = userStore.isAuthenticated

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router