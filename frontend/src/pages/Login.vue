<script setup lang="ts">
import apiClient from "../api/"
import { ref } from "vue"

const email = ref<string>("")
const password = ref<string>("")

const handleLogin = (e: Event) => {
    apiClient.post('/auth/login', {
        email: email.value,
        password: password.value
    })
}

</script>

<template>
    <div class="login-wrapper">
        <div>
            <h3>Login</h3>
        </div>
        <form @submit.prevent="handleLogin">
            <label for="email">Email:</label>
            <input v-model=email type="email" id="email" name="email" placeholder="Type your email" required>
            
            <label for="password">Password:</label>
            <input v-model=password type="password" id="password" name="password" placeholder="Type your password" required>

            <input type="submit" value="Log in">
        </form>
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
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin-bottom: 8px;
    color: #555555;
    font-weight: 500;
}

input[type="email"],
input[type="password"] {
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    font-size: 16px;
    transition: border-color 0.3s ease;
}

input[type="email"]:focus,
input[type="password"]:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

input[type="submit"] {
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

input[type="submit"]:hover {
    background-color: #0056b3;
}
</style>
