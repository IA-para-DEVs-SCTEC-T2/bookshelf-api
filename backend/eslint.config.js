module.exports = [
 {
   files: ['src/**/*.js', 'tests/**/*.js'],
   languageOptions: {
     ecmaVersion: 'latest',
     sourceType: 'commonjs',
     globals: {
       console: 'readonly',
       require: 'readonly',
       module: 'readonly',
       process: 'readonly',
       __dirname: 'readonly',
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
