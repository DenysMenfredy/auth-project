import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '../api' // adjust path as needed

export interface User {
  name: string
  email: string
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)

  // Actions
  const login = async (email: string, password: string) => {
  isLoading.value = true
  error.value = null
  
  try {
    const response = await apiClient.post('/auth/login', {
      email,
      password
    })
    
    // Get both token and user in one call
    token.value = response.data.token
    user.value = response.data.user
    
    localStorage.setItem('authToken', response.data.token)
    
    return true
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Login failed'
    return false
  } finally {
    isLoading.value = false
  }
}

const initializeAuth = async () => {
  const storedToken = localStorage.getItem('authToken')
  
  if (storedToken) {
    token.value = storedToken
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
    
    // Use /me endpoint on app initialization to validate token
    await fetchUser()
  }
}

  const logout = () => {
    user.value = null
    token.value = null
    error.value = null
    localStorage.removeItem('authToken')
  }

  const fetchUser = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const response = await apiClient.get('/auth/me')
    user.value = response.data
    return true
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to fetch user'
    console.error('Failed to fetch user:', err)
    
    // If token is invalid (401), logout
    if (err.response?.status === 401) {
      logout()
    }
    
    return false
  } finally {
    isLoading.value = false
  }
}


  return {
    // State
    user,
    token,
    isLoading,
    error,
    // Getters
    isAuthenticated,
    // Actions
    login,
    logout,
    fetchUser,
    initializeAuth
  }
})
