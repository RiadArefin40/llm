<template>
    <div class="signup-container">
      <div class="signup-box">
        
        <div class="flex justify-center items-center">
          <img style="width: 45px;" src="https://i.ibb.co.com/9kkzqCNj/dall.png" alt="dall" border="0">
          <h1 class="signup-title mt-4 ml-2">Create an Account</h1>

        </div>
        <p class="signup-subtitle">Sign up to get started</p>
        <form @submit.prevent="handleSignup">
          <div class="form-group">
            <label for="name" class="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              v-model="name"
              placeholder="Enter your full name"
              class="form-input"
            />
          </div>
  
          <div class="form-group">
            <label for="phone" class="form-label">Phone Number</label>
            <input
              type="tel"
              id="phone"
              v-model="phone"
              placeholder="Enter your phone number"
              class="form-input"
            />
          </div>
  
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Enter your password"
              class="form-input"
            />
          </div>
  
          <div class="form-group">
            <label for="referral" class="form-label">Referral Code (Optional)</label>
            <input
              type="text"
              id="referral"
              v-model="referral"
              placeholder="Enter referral code"
              class="form-input"
            />
          </div>
  
          <button type="submit" class="signup-button">Sign Up</button>
  
          <div class="login-link-container">
            <p class="login-link-text">
              Already have an account? <a @click="toLogin" class="login-link">Log In</a>
            </p>
          </div>
        </form>
      </div>
      <Toast/>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  definePageMeta({ layout: "secondary" });
  const name = ref('');
  const phone = ref('');
  const password = ref('');
  const referral = ref('');
  import { useToast } from 'primevue/usetoast';

  const toast = useToast();

  const toLogin = ()=>{
     router.push('/login')
  }
  const handleSignup = async () => {

    try {
      const payload = {
      name: name.value,
      phone_number: phone.value,
      password: password.value,
      referralCode:referral.value
    }
    const response = await fetch('https://llmbackend-production.up.railway.app/signup', {
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
    navigateTo('/')
    toast.add({ severity: 'info', summary: data.message, life: 3000 });
  } catch (error) {
    toast.add({ severity: 'info', summary: error, life: 3000 });
  }



  };


  </script>
  
  <style>
  .signup-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom right, #46e5e5, #3b82f6);
    padding: 16px;
  }
  
  .signup-box {
    width: 100%;
    max-width: 380px;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 24px;
    text-align: center;
  }
  
  .signup-title {
    font-size: 24px;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 12px;
  }
  
  .signup-subtitle {
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
  
  .signup-button {
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
  
  .signup-button:hover {
    background: linear-gradient(to right, #4338ca, #2563eb);
  }
  
  .login-link-container {
    margin-top: 16px;
  }
  
  .login-link-text {
    font-size: 14px;
    color: #6b7280;
  }
  
  .login-link {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease-in-out;
  }
  
  .login-link:hover {
    color: #1d4ed8;
  }
  </style>
  