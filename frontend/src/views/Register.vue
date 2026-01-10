 <script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import apiClient from '../api'

const router = useRouter()
const toast = useToast()

const name = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const isLoading = ref(false)
const error = ref<string | null>(null)

const handleRegister = async (event?: Event) => {
  if (event) event.preventDefault()
  // Validation
  if (!name.value || !name.value.trim()) {
    toast.warning('Please enter your name')
    return
  }

  if (!email.value || !email.value.trim()) {
    toast.warning('Please enter your email address')
    return
  }

  if (!password.value || !password.value.trim()) {
    toast.warning('Please enter your password')
    return
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    toast.warning('Please enter a valid email address')
    return
  }

  // Password length validation
  if (password.value.length < 6) {
    toast.warning('Password must be at least 6 characters long')
    return
  }

  isLoading.value = true
  error.value = null

  try {
    console.log('Making POST request to /auth/register with data:', {
      name: name.value,
      email: email.value,
      password: password.value
    })
    const response = await apiClient.post('/auth/register', {
      name: name.value,
      email: email.value,
      password: password.value
    })
    console.log('Registration successful, response:', response)

    toast.success('Registration successful! Please log in.')
    router.push('/login')
  } catch (err: any) {
    console.error('Registration failed, error:', err)
    if (err.response) {
      const status = err.response.status
      const message = err.response.data?.message

      if (status === 409) {
        error.value = message || 'User already exists'
      } else if (status >= 500) {
        error.value = 'Server error. Please try again later.'
      } else {
        error.value = message || 'Registration failed. Please try again.'
      }
    } else if (err.request) {
      error.value = 'Unable to connect to server. Check your internet connection.'
    } else {
      error.value = 'An unexpected error occurred. Please try again.'
    }

    toast.error(error.value)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="register-wrapper">
    <div>
      <h3>Register</h3>
    </div>

    <div class="register-form">
      <label for="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        v-model="name"
        placeholder="Type your name"
        :disabled="isLoading"
        @keyup.enter.prevent="handleRegister"
      >

      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        v-model="email"
        placeholder="Type your email"
        :disabled="isLoading"
        @keyup.enter.prevent="handleRegister"
      >

      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        v-model="password"
        placeholder="Type your password"
        :disabled="isLoading"
        @keyup.enter.prevent="handleRegister"
      >

      <button
        type="button"
        @click="handleRegister"
        class="btn-primary"
        :disabled="isLoading"
      >
        <span v-if="isLoading" class="spinner"></span>
        {{ isLoading ? 'Registering...' : 'Register' }}
      </button>
      <RouterLink to="/login">
        <span>Already have an account? Log in.</span>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.register-wrapper {
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
a {
    color: #000;
    margin-top: 10px;
    cursor: pointer;
    span {
            font-size: .8rem;
    }
}
.register-form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
  color: #555555;
  font-weight: 500;
  font-size: 14px;
}

input[type="text"],
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

input[type="text"]:hover,
input[type="email"]:hover,
input[type="password"]:hover {
  border-color: #b0b0b0;
  background-color: #ffffff;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: #007bff;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

input[type="text"]::placeholder,
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
