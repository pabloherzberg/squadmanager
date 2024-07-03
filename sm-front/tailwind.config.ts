import type { Config } from 'tailwindcss';

export const commonColors = {
  black: '#000000',
  white: {
    DEFAULT: '#FFFFFF',
    200: '#FAFAFA',
  },
  primary: {
    DEFAULT: '#90CAF9',
  },
  secondary: {
    DEFAULT: '#64B5F6',
    200: '#BBDEFB',
  },
  gray: {
    DEFAULT: '#B0BEC5',
    200: '#CFD8DC',
    300: '#ECEFF1',
    400: '#F5F5F5',
    disabled: '#CFD8DC',
    border: '#CFD8DC',
  },
  blue: {
    DEFAULT: '#90CAF9',
    200: '#BBDEFB',
  },
  red: {
    DEFAULT: '#FFCDD2',
    200: '#FFE5E7',
    lightRed: '#FF8A80',
  },
  green: '#C8E6C9',
  lightGreen: '#E8F5E9',
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
