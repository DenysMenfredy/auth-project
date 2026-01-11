<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '../stores/auth'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import { Form, type FormSubmitEvent } from '@primevue/forms'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const email = ref<string>('')
const password = ref<string>('')

const handleLogin = async (_event: FormSubmitEvent) => {
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

    <Form @submit="handleLogin" class="login-form">
      <FloatLabel label="Email" variant="on">
        <InputText
          id="email"
          name="email"
          v-model="email"
          :disabled="authStore.isLoading"
          class="w-full"
        />
      </FloatLabel>

      <FloatLabel label="Password" variant="on">
        <Password
          id="password"
          name="password"
          v-model="password"
          :feedback="false"
          :disabled="authStore.isLoading"
          class="w-full"
        />
      </FloatLabel>

      <Button
        type="submit"
        :loading="authStore.isLoading"
        label="Log in"
        class="w-full"
      />
      <RouterLink to="/register">
        <span>Doesn't have an account? Create one.</span>
      </RouterLink>
    </form>
  </div>
</template>

<style scoped>
.login-wrapper {
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

.login-form {
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
