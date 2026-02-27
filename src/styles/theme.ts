import { createTheme, type MantineColorsTuple } from '@mantine/core';

const mealOrange: MantineColorsTuple = [
  '#fff3e3',
  '#ffe5cd',
  '#fec99c',
  '#fdab67',
  '#fc923a',
  '#fc821e',
  '#fc7a0f',
  '#df6702',
  '#c95b00',
  '#af4d00',
];

const mealGreen: MantineColorsTuple = [
  '#f2fbe9',
  '#e6f3da',
  '#cee5b6',
  '#b3d68f',
  '#9cc96d',
  '#8dc158',
  '#85be4c',
  '#6c9e39',
  '#649433',
  '#538026',
];

export const theme = createTheme({
  fontFamily: 'Poppins, sans-serif',
  colors: {
    'm-orange': mealOrange,
    'm-green': mealGreen,
  },
  primaryColor: 'm-orange',

  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },

  headings: {
    fontFamily: 'Roboto, sans-serif',
    sizes: {
      h1: { fontSize: '36px' },
    },
  },
});
