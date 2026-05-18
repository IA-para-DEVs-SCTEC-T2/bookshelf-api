import react from 'eslint-plugin-react';

export default [
  {
    files: ['src/**/*.js', 'src/**/*.jsx'],
    plugins: {
      react
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        document: 'readonly',
        window: 'readonly',
        console: 'readonly',
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': 'error',
      'react/jsx-uses-vars': 'error',
      'react/jsx-uses-react': 'off',
      semi: ['error', 'always'],
      quotes: ['error', 'single']
    }
  }
];