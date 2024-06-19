// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  build: {
    transpile: ['vuetify', '@intlify/core-base'],
  },
  modules: [
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxt/devtools',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    '@invictus.codes/nuxt-vuetify',
  ],
  vuetify: {
    /* vuetify options */
    vuetifyOptions: {
      theme: {
        defaultTheme: 'EchTheme',
        themes: {
          EchTheme: {
            dark: false,
            colors: {
              primary: '#C69582',
              secondary: '#F8F0E8',
              warning: '#794731',
              success: '#2CAA31',
              surface: '#613929',
              accent: '#CCB36D',
              borderBtn: '#BCBCBC',
            },
          },
        },
      },
    },

    moduleOptions: {
      /* nuxt-vuetify module options */
      treeshaking: true,
      useIconCDN: true,

      /* vite-plugin-vuetify options */
      autoImport: true,
      useVuetifyLabs: true,
    },
  },
  i18n: {
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'th',
    locales: [
      { name: 'ไทย', code: 'th', iso: 'th-TH', file: 'th.json' },
      { name: 'English', code: 'en', iso: 'en-US', file: 'en.json' }
    ],
    detectBrowserLanguage: false,
  },
  
  pinia: {
    autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
  },
  googleFonts: {
    download: true,
    families: {
      'Noto Sans Thai': true,
      Sriracha: true,
    },
  },
  
  runtimeConfig: {
    // Private keys are only available on the server
    private: {
      cms: {
        origin: process.env.CMS_URL,
      },
    },
    public: {
      cms: {
        proxy: '/cms',
      },
    },
  }
})
