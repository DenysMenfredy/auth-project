import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import App from './App.vue'
import 'vue-toastification/dist/index.css'
import { router } from "./router"
import { useAuthStore } from './stores/auth'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Toast, {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  transition: 'Vue-Toastification__bounce',
  maxToasts: 3,
  newestOnTop: true
})

app.mount('#app')

// Initialize auth after app is mounted
const authStore = useAuthStore()
authStore.initializeAuth()
