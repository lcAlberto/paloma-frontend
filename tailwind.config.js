/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            colors: {
                "primary-50": "#f1f0fd",
                "primary-100": "#e6e3fc",
                "primary-200": "#cfcafa",
                "primary-300": "#aa9ff6",
                "primary-400": "#826bf0",
                "primary-500": "#3f15d5",
                "primary-600": "#4315ba",
                "primary-700": "#422095",
                "primary-800": "#3d1e87",
                "primary-900": "#2f1865",
                "primary-950": "#1c0d46",

                'secondary-50': '#f1f2f8',
                'secondary-100': '#e2e5ee',
                'secondary-200': '#bec6da',
                'secondary-300': '#8696b9',
                'secondary-400': '#4e6188',
                'secondary-500': '#343f57',
                'secondary-600': '#293248',
                'secondary-700': '#22293b',
                'secondary-800': '#1d2331',
                'secondary-900': '#1a1f2a',
                'secondary-950': '#11141c',

                'accent-50': '#f8fee7',
                'accent-100': '#eefccb',
                'accent-200': '#defa9c',
                'accent-300': '#c5f363',
                'accent-400': '#ace833',
                'accent-500': '#93d615',
                'accent-600': '#6ca40c',
                'accent-700': '#527d0e',
                'accent-800': '#436311',
                'accent-900': '#395413',
                'accent-950': '#1c2e05',


                'info-50': '#f2f9ff',
                'info-100': '#e3f2ff',
                'info-200': '#c0e6ff',
                'info-300': '#88d2ff',
                'info-400': '#33b5ff',
                'info-500': '#1ba8fa',
                'info-600': '#008ce8',
                'info-700': '#006fbb',
                'info-800': '#025d9b',
                'info-900': '#094d7f',
                'info-950': '#063155',


                'warning-50': '#fbffe7',
                'warning-100': '#f4ffc1',
                'warning-200': '#eeff86',
                'warning-300': '#ecff41',
                'warning-400': '#f2ff0d',
                'warning-500': '#ffff00',
                'warning-600': '#d1bf00',
                'warning-700': '#a68b02',
                'warning-800': '#896c0a',
                'warning-900': '#74580f',
                'warning-950': '#443004',

                'danger-50': '#fff1f1',
                'danger-100': '#ffdfdf',
                'danger-200': '#ffc5c5',
                'danger-300': '#ff9d9e',
                'danger-400': '#ff6465',
                'danger-500': '#ff494a',
                'danger-600': '#ed1516',
                'danger-700': '#c80d0e',
                'danger-800': '#a50f10',
                'danger-900': '#881415',
                'danger-950': '#4b0404',


                "surface-0": "rgb(var(--surface-0))",
                "surface-50": "rgb(var(--surface-50))",
                "surface-100": "rgb(var(--surface-100))",
                "surface-200": "rgb(var(--surface-200))",
                "surface-300": "rgb(var(--surface-300))",
                "surface-400": "rgb(var(--surface-400))",
                "surface-500": "rgb(var(--surface-500))",
                "surface-600": "rgb(var(--surface-600))",
                "surface-700": "rgb(var(--surface-700))",
                "surface-800": "rgb(var(--surface-800))",
                "surface-900": "rgb(var(--surface-900))",
                "surface-950": "rgb(var(--surface-950))",
            },
        },
    },
    plugins: [require('tailwindcss-primeui')],
}

