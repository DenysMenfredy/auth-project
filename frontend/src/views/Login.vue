<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const email = ref<string>('')
const password = ref<string>('')

const handleLogin = async () => {
  // Validation
  if (!email.value || !email.value.trim()) {
    toast.warning('Please enter your email address')
    return
  }

  if (!password.value || !password.value.trim()) {
    toast.warning('Please enter your password')
    return
  }

  // Email format validation (optional but recommended)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    toast.warning('Please enter a valid email address')
    return
  }

  // Attempt login
  const success = await authStore.login(email.value, password.value)
  console.log(success)

  if (success) {
    console.log('success')
    toast.success(`Welcome back, ${authStore.user?.name}!`)
    router.push('/')
  } else {
    console.log('no success')
    // Error is already set in the store, display it
    toast.error(authStore.error || 'Login failed. Please try again.')
  }
}
</script>

<template>
  <div class="login-wrapper">
    <div>
      <h3>Login</h3>
    </div>
    
     <div class="login-form">
       <label for="email">Email:</label>
       <input
         type="email"
         id="email"
         name="email"
         v-model="email"
         placeholder="Type your email"
         :disabled="authStore.isLoading"
         @keyup.enter="handleLogin"
       >

       <label for="password">Password:</label>
       <input
         type="password"
         id="password"
         name="password"
         v-model="password"
         placeholder="Type your password"
         :disabled="authStore.isLoading"
         @keyup.enter="handleLogin"
       >

       <button
         type="button"
         @click="handleLogin"
         class="btn-primary"
         :disabled="authStore.isLoading"
       >
         <span v-if="authStore.isLoading" class="spinner"></span>
         {{ authStore.isLoading ? 'Logging in...' : 'Log in' }}
       </button>
     </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  max-width: 500px;
  margin: 50px auto;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h3 {
  text-align: center;
  color: #333333;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
}

.login-form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  color: #555555;
  font-weight: 500;
  font-size: 14px;
}

input[type="email"],
input[type="password"] {
  padding: 12px 16px;
  margin-bottom: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.3s ease;
  background-color: #fafafa;
  color: #000;
}

input[type="email"]:hover,
input[type="password"]:hover {
  border-color: #b0b0b0;
  background-color: #ffffff;
}

input[type="email"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: #007bff;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

input[type="email"]::placeholder,
input[type="password"]::placeholder {
  color: #999999;
}

input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #f5f5f5;
}

.btn-primary {
  padding: 14px 24px;
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #0056b3 0%, #003d82 100%);
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.4);
  transform: translateY(-1px);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.btn-primary:focus-visible {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

input:focus-visible {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}
</style>
