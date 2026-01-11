import { createApp } from 'vue'
import PrimeVue from "primevue/config"
import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'
import './style.css'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import App from './App.vue'
import 'vue-toastification/dist/index.css'
import { router } from "./router"
import { useAuthStore } from './stores/auth'

const pinia = createPinia()

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16'
    },
    colorScheme: {
      light: {
        text: {
          color: '#000000'
        }
      }
    }
  },
  components: {
    inputtext: {
      root: {
        background: '#222222'
      }
    }
  }
})

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: MyPreset
    }
})
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
