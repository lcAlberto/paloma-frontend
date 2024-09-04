export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    ssr: true,
    devtools: {enabled: true},
    app: {
        head: {
            link: [
                {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css'}
            ],
            meta: [
                {charset: 'utf-8'},
                {'data-theme': 'light'},
                {name: 'csrf-token', content: ''}
            ]
        }
    },
    css: [
        '~/assets/css/main.css',
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: [
        '@primevue/nuxt-module'
    ],
    build: {
        transpile: ['primevue'],
    },
    vite: {
        plugins: [],
    },
    primevue: {
        usePrimeVue: true,
        autoImport: true,
        importTheme: {from: '~/themes/default.ts'},
    },
    runtimeConfig: {
        apiSecret: '',
        public: {
            apiBase: '',
        }
    },
})
