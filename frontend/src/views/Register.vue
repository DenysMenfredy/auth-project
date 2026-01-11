<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import apiClient from '../api'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import FloatLabel from 'primevue/floatlabel'
import { Form, type FormSubmitEvent } from '@primevue/forms'

const router = useRouter()
const toast = useToast()

const name = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const isLoading = ref(false)
const error = ref<string | null>(null)

const handleRegister = async (_event: FormSubmitEvent) => {

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

    <Form @submit="handleRegister" class="register-form">
      <FloatLabel label="Name" variant="on">
        <InputText
          id="name"
          name="name"
          v-model="name"
          :disabled="isLoading"
          class="w-full"
        />
      </FloatLabel>

      <FloatLabel label="Email" variant="on">
        <InputText
          id="email"
          name="email"
          v-model="email"
          :disabled="isLoading"
          class="w-full"
        />
      </FloatLabel>

      <FloatLabel label="Password" variant="on">
        <Password
          id="password"
          name="password"
          v-model="password"
          :disabled="isLoading"
          class="w-full"
        />
      </FloatLabel>

      <Button
        type="submit"
        :loading="isLoading"
        label="Register"
        class="w-full"
      />
      <RouterLink to="/login">
        <span>Already have an account? Log in.</span>
      </RouterLink>
    </form>
  </div>
</template>

<style scoped>
.register-wrapper {
  max-width: 500px;
  margin: 50px auto;
  padding: 40px;
  background-color: #222222;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h3 {
  text-align: center;
  color: #ffffff;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
}

a {
  color: #000;
  margin-top: 10px;
  cursor: pointer;
}

a span {
  font-size: 0.8rem;
  color: #ffffff;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  color: #ffffff;
  font-weight: 500;
  font-size: 14px;
}

.p-button {
  color: #ffffff !important;
}
</style>
