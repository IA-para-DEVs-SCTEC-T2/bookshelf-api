export default [
 {
   files: ['src/**/*.js', 'src/**/*.jsx'],
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
     semi: ['error', 'always'],
     quotes: ['error', 'single']
   }
 }
];
