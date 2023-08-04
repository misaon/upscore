import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import daisyUi from 'daisyui'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', ...defaultTheme.fontFamily.sans]
      },
    },
    container: {
      center: true,
      padding: '2rem'
    },
    darkMode: 'class'
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: '#0EA5E9',
          secondary: '#6366F1',
          accent: '#2DD4BF',
          neutral: '#334155',
          'base-100': '#F9FAFC',
          info: '#64b5f6',
          success: '#aed581',
          warning: '#ffb74d',
          error: '#e57373'
        },
        dark: {
          primary: '#0EA5E9',
          secondary: '#6366F1',
          accent: '#2DD4BF',
          neutral: '#1E293B',
          'base-100': '#0F172A',
          info: '#1565c0',
          success: '#558b2f',
          warning: '#ef6c00',
          error: '#c62828'
        }
      }
    ]
  },
  plugins: [daisyUi]
}
