import type { Config } from 'tailwindcss';

export const commonColors = {
  black: '#000000',
  white: {
    DEFAULT: '#FFFFFF',
    200: '#FAFAFA',
  },
  primary: {
    DEFAULT: '#90CAF9', // Azul pastel um pouco mais forte
  },
  secondary: {
    DEFAULT: '#64B5F6', // Azul claro pastel um pouco mais forte
    200: '#BBDEFB', // Azul muito claro pastel
  },
  gray: {
    DEFAULT: '#B0BEC5', // Cinza pastel
    200: '#CFD8DC', // Cinza claro pastel
    300: '#ECEFF1', // Cinza muito claro pastel
    400: '#F5F5F5', // Cinza muito muito claro pastel
    disabled: '#CFD8DC',
    border: '#CFD8DC',
  },
  blue: {
    DEFAULT: '#90CAF9', // Azul pastel um pouco mais forte
    200: '#BBDEFB', // Azul muito claro pastel
  },
  red: {
    DEFAULT: '#FFCDD2', // Vermelho pastel
    200: '#FFE5E7', // Vermelho muito claro pastel
    lightRed: '#FF8A80',
  },
  green: '#C8E6C9', // Verde pastel
  lightGreen: '#E8F5E9', // Verde muito claro pastel
};

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: commonColors,
      borderColor: commonColors,
      backgroundColor: commonColors,
    },
  },
  plugins: [],
};

export default config;
