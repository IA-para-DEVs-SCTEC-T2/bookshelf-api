import pluginReact from 'eslint-plugin-react';

export default [
  {
    files: ['src/**/*.js', 'src/**/*.jsx'],
    plugins: { react: pluginReact },
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
      'react/jsx-uses-vars': 'error',
      'no-unused-vars': 'error',
      semi: ['error', 'always'],
      quotes: ['error', 'single']
    }
  }
];
