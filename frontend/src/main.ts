import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from "./router"
import { useAuthStore } from './stores/auth'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')

// Initialize auth after app is mounted
const authStore = useAuthStore()
authStore.initializeAuth()
