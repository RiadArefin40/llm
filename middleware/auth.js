

export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const token = localStorage.getItem('token')
    if (!token) {
      // If no token is found, redirect to the login page
      return navigateTo('/login')
    }
  }
});
