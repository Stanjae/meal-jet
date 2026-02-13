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
  '#af4d00'
];

export const theme = createTheme({
  colors: {
    'm-orange': mealOrange
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