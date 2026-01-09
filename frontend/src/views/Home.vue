<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>Dashboard</h1>
      <div class="user-section">
        <button @click="handleLogout" class="btn-logout">
          Logout
        </button>
      </div>
    </header>
    
    <main class="dashboard-content">
      <p>Email: {{ authStore.user?.email }}</p>
      <!-- Your dashboard content -->
     <div class="user-info">
          <span class="welcome">Welcome back,</span>
          <span class="user-name">{{ authStore.user?.name }}</span>
    </div>
    </main>
  </div>
</template>

<style scoped>
.dashboard {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.dashboard-header {
  background-color: white;
  padding: 20px 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-header h1 {
  margin: 0;
  color: #333;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.welcome {
  font-size: 14px;
  color: #666;
}

.user-name {
  font-weight: 600;
  color: #333;
}

.btn-logout {
  padding: 10px 24px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(220, 53, 69, 0.2);
}

.btn-logout:hover {
  background-color: #c82333;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
}

.btn-logout:active {
  transform: translateY(0);
}

.dashboard-content {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
