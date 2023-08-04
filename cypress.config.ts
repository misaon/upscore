import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires,unicorn/prefer-module
      require('@cypress/code-coverage/task')(on, config);

      return config;
    },
  },
});
