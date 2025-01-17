// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@primevue/nuxt-module'
],
primevue: {
  autoImport: true,
  options: {
    ripple: true,
    inputVariant: 'filled',
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: true,
            cssLayer: false
        }
    }
}
}

})
