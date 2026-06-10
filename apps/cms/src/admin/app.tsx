import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    // Customize the admin panel theme
    theme: {
      light: {
        colors: {
          primary100: '#fef3e6',
          primary200: '#fdd9a0',
          primary500: '#f5a623',
          primary600: '#e8951a',
          primary700: '#d48312',
          buttonPrimary500: '#f5a623',
          buttonPrimary600: '#e8951a',
        },
      },
      dark: {
        colors: {
          primary100: '#2e2518',
          primary200: '#5c4a30',
          primary500: '#f5a623',
          primary600: '#e8951a',
          primary700: '#d48312',
          buttonPrimary500: '#f5a623',
          buttonPrimary600: '#e8951a',
        },
      },
    },
    // Customize tutorials and notifications
    tutorials: false,
    notifications: { releases: false },
  },
  bootstrap(_app: StrapiApp) {
    // You can add custom bootstrap logic here
  },
};
