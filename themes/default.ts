import {definePreset} from '@primevue/themes';
import Aura from '@primevue/themes/aura';

const palomaDefaultTheme = definePreset(Aura, {
    primitive: {
        borderRadius: {
            none: '0',
            xs: '0.125rem',
            rounded: '0.25rem',
            sm: '0.125rem',
            md: '0.375rem',
            lg: '0.5rem',
            xl: '0.75rem',
            '2xl': '1rem',
            '3xl': '1.5rem',
        },
    },
    semantic: {
        primary: {
            "50": "#f1f0fd",
            "100": "#e6e3fc",
            "200": "#cfcafa",
            "300": "#aa9ff6",
            "400": "#826bf0",
            "500": "#3f15d5",
            "600": "#4315ba",
            "700": "#422095",
            "800": "#3d1e87",
            "900": "#2f1865",
            "950": "#1c0d46",
        },
        colorScheme: {
            light: {
                primary: {
                    color: '{primary.500}',
                    inverseColor: '#ffffff',
                    hoverColor: '{primary.900}',
                    activeColor: '{primary.800}'
                },
                secondary: {
                    color: '#1c0d46',
                    inverseColor: '#ffffff',
                    hoverColor: '{zinc.900}',
                    activeColor: '{secondary.800}'
                },
                highlight: {
                    background: '{zinc.950}',
                    focusBackground: '{zinc.700}',
                    color: '#ffffff',
                    focusColor: '#ffffff'
                }
            },
        },
        content: {
            borderRadius: '{border.radius.lg}'
        },
        formField: {
            borderRadius: '{border.radius.xl}',
        }
    },
});

export default {
    preset: palomaDefaultTheme,
    options: {
        darkModeSelector: '.-dark'
    }
};

