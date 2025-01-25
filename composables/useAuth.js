// composables/useAuth.js
import { saveAuthData, getAuthToken, getUser, clearAuthData } from '@/utils/auth';

export const useAuth = () => {
  const user = ref(null);
  const token = ref(null);

  const initialize = () => {
    if (process.client) {
      token.value = getAuthToken();
      user.value = getUser();
    }
  };

  const login = async (email, password) => {
    const response = await $fetch('/api/login', {
      method: 'POST',
      body: { email, password },
    });

    saveAuthData(response); // Save token and user to local storage
    token.value = response.token;
    user.value = response.user;
  };

  const logout = () => {
    clearAuthData();
    token.value = null;
    user.value = null;
    navigateTo('/login');
  };

  return {
    user,
    token,
    initialize,
    login,
    logout,
    isAuthenticated: computed(() => !!token.value),
  };
};
