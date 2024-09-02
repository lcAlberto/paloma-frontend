import Aura from '@primevue/themes/aura';

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
        '~/assets/css/primevue-theme.css'
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
    primevue: {
        options: {
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: 'system',
                    cssLayer: {
                        name: 'primevue',
                        order: 'tailwind-base, tailwind-utilities, primevue'
                    }
                }
            }
        }
    },
})
