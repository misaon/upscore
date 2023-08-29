import { en } from '@formkit/i18n';
import { defineFormKitConfig } from '@formkit/vue';
import { generateClasses } from '@formkit/themes';
import { tailwindTheme } from 'assets/formkit-theme';

export default defineFormKitConfig({
  locales: { en },
  locale: 'en',
  config: {
    classes: generateClasses(tailwindTheme),
  },
});
