<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

const router = useRouter()
const authStore = useAuthStore()

watch(() => authStore.isAuthenticated, (newVal) => {
  if (!newVal && router.currentRoute.value.path !== '/login') {
    router.push('/login')
  } else if (newVal && router.currentRoute.value.path === '/login') {
    router.push('/')
  }
})

onMounted(() => {
  // Watcher will handle initial navigation after auth init
})
</script>

<template>
    <router-view />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
