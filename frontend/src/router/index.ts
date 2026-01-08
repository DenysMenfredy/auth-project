import { createMemoryHistory, createRouter } from "vue-router"

import HomeView from "../views/Home.vue"
import LoginView from "../views/Login.vue"
import { useAuthStore } from "../stores/auth"

const routes = [
    { path: '/', component: HomeView },
    { path: '/login', component: LoginView }
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

// Navigation guard
router.beforeEach((to) => {
    const authStore = useAuthStore()

    if (!authStore.isAuthenticated && to.path !== '/login') {
        return '/login'
    }

    if (authStore.isAuthenticated && to.path === '/login') {
        return '/'
    }
})
