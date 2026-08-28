import { defineConfig } from 'cypress';

export default defineConfig({

  e2e: {
    baseUrl: 'https://fakestoreapi.com',
    env: {
      apiUrl: 'https://fakestoreapi.com',
      username: 'mor_2314',
      password: '83r5^_'
    }
  },

  video: false,

  defaultCommandTimeout: 10000,

  requestTimeout: 10000

});