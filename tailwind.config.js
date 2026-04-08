/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#7f5af0',
                    dark: '#6938ef',
                    light: '#9d7ff5',
                },
                accent: {
                    pink: '#ff6b9d',
                    blue: '#4a90e2',
                },
                dark: {
                    bg: '#02020a',
                    card: '#0a0a1a',
                    gray: '#151525',
                },
            },
            fontFamily: {
                heading: ['Syne', 'Inter', 'sans-serif'],
                body: ['Inter', 'Space Grotesk', 'sans-serif'],
                poetic: ['Playfair Display', 'Crimson Text', 'serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-out',
                'slide-up': 'slideUp 0.8s ease-out',
                'glow-pulse': 'glowPulse 2s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'particle-drift': 'particleDrift 10s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                glowPulse: {
                    '0%, 100%': { opacity: '0.8', filter: 'brightness(1)' },
                    '50%': { opacity: '1', filter: 'brightness(1.3)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                particleDrift: {
                    '0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0' },
                    '10%': { opacity: '1' },
                    '90%': { opacity: '1' },
                    '100%': { transform: 'translate(100px, -100vh) rotate(360deg)', opacity: '0' },
                },
            },
        },
    },
    plugins: [],
};
