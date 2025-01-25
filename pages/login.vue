<template>
    <div class="login-container">
      <div class="login-box">
        <h1 class="login-title">Welcome Back</h1>
        <p class="login-subtitle">Login to your account to continue</p>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="phone" class="form-label">Phone Number</label>
            <input
              type="text"
              id="phone"
              v-model="phone"
              placeholder="Enter your email"
              class="form-input"
            />
          </div>
  
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input
              type="text"
              id="password"
              v-model="password"
              placeholder="Enter your password"
              class="form-input"
            />
          </div>
  
          <div class="form-actions">
            <label class="checkbox-container">
              <input type="checkbox" class="checkbox-input" />
              <span class="checkbox-label">Remember me</span>
            </label>
            <!-- <a href="/forgot-password" class="forgot-password-link">Forgot Password?</a> -->
          </div>
  
          <button type="submit" class="login-button">Login</button>
  
          <div class="signup-link-container">
            <p class="signup-link-text">
              Don't have an account? <a href="/register" class="signup-link">Sign Up</a>
            </p>
          </div>
        </form>
      </div>
      <Toast/>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  definePageMeta({ layout: "secondary" });
  const password = ref('');
  const phone = ref('');
  import { useToast } from 'primevue/usetoast';
  const toast = useToast();

  
  const handleLogin = async () => {

    try {
      const payload = {
      phone_number: phone.value,
      password: password.value,
    }
    const response = await fetch('https://llmbackend-production.up.railway.app/login', {
      method: 'POST',
      headers: {
        // 'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const data = await response.json();
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    navigateTo('/');
    toast.add({ severity: 'info', summary: data.message, life: 3000 });
  } catch (error) {
    toast.add({ severity: 'info', summary: error, life: 3000 });
  }
  };
  </script>
  
  <style>
  .login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom right, #46e5d0, #3b82f6);
    padding: 16px;
  }
  
  .login-box {
    width: 100%;
    max-width: 360px;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 24px;
    text-align: center;
  }
  
  .login-title {
    font-size: 24px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 12px;
  }
  
  .login-subtitle {
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 24px;
  }
  
  .form-group {
    margin-bottom: 16px;
    text-align: left;
  }
  
  .form-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 8px;
  }
  
  .form-input {
    width: 100%;
    padding: 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    color: #1f2937;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: border-color 0.2s ease-in-out;
  }
  
  .form-input:focus {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }
  
  .form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  
  .checkbox-container {
    display: flex;
    align-items: center;
  }
  
  .checkbox-input {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
  
  .checkbox-label {
    font-size: 14px;
    color: #6b7280;
  }
  
  .forgot-password-link {
    font-size: 14px;
    color: #3b82f6;
    text-decoration: none;
    transition: color 0.2s ease-in-out;
  }
  
  .forgot-password-link:hover {
    color: #1d4ed8;
  }
  
  .login-button {
    width: 100%;
    padding: 12px;
    background: linear-gradient(to right, #4f46e5, #3b82f6);
    border: none;
    border-radius: 8px;
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
  }
  
  .login-button:hover {
    background: linear-gradient(to right, #4338ca, #2563eb);
  }
  
  .signup-link-container {
    margin-top: 16px;
  }
  
  .signup-link-text {
    font-size: 14px;
    color: #6b7280;
  }
  
  .signup-link {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease-in-out;
  }
  
  .signup-link:hover {
    color: #1d4ed8;
  }
  </style>
  