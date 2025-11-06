import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: '#8B1538',
          50: '#FDF2F5',
          100: '#FAE5EB',
          200: '#F4C2D2',
          300: '#ED9FB9',
          400: '#E77CA0',
          500: '#E05987',
          600: '#D9366E',
          700: '#B52857',
          800: '#8B1538',
          900: '#610F27',
        },
        bordeaux: {
          DEFAULT: '#8B1538',
          50: '#FDF2F5',
          100: '#FAE5EB',
          200: '#F4C2D2',
          300: '#ED9FB9',
          400: '#E77CA0',
          500: '#E05987',
          600: '#D9366E',
          700: '#B52857',
          800: '#8B1538',
          900: '#610F27',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
