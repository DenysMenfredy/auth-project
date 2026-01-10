import { createMemoryHistory, createRouter } from "vue-router"

import HomeView from "../views/Home.vue"
import LoginView from "../views/Login.vue"
import RegisterView from "../views/Register.vue"
import { useAuthStore } from "../stores/auth"

const routes = [
    { path: '/', component: HomeView },
    { path: '/login', component: LoginView },
    { path: '/register', component: RegisterView }
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

// Navigation guard
router.beforeEach((to) => {
    const authStore = useAuthStore()

    if (!authStore.isAuthenticated && to.path !== '/login' && to.path !== '/register') {
        return '/login'
    }

    if (authStore.isAuthenticated && (to.path === '/login' || to.path === '/register')) {
        return '/'
    }
})
