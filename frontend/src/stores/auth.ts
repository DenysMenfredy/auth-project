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
    
        token.value = response.data.token
        user.value = response.data.user
        
        localStorage.setItem('authToken', response.data.token)
        
        return true
    } catch (err: any) {
        // Parse different error types
        if (err.response) {
          // Server responded with error
          const status = err.response.status
          const message = err.response.data?.message
          
          if (status === 401) {
            error.value = message || 'Invalid email or password'
          } else if (status === 429) {
            error.value = 'Too many login attempts. Please try again later.'
          } else if (status >= 500) {
            error.value = 'Server error. Please try again later.'
          } else {
            error.value = message || 'Login failed. Please try again.'
          }
        } else if (err.request) {
          // Request made but no response
          error.value = 'Unable to connect to server. Check your internet connection.'
        } else {
          // Something else happened
          error.value = 'An unexpected error occurred. Please try again.'
        }
        
        console.error('Login error:', err)
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
