/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                logo: ['"Space Grotesk"', 'sans-serif'],
                hero: ['"Clash Display"', 'sans-serif'],
                section: ['"Sora"', 'sans-serif'],

            },
        },
    },
    plugins: [],
}
