const request = require('supertest');
const app = require('../src/app');

describe('BookShelf API - testes mínimos', () => {
 test('deve retornar status de saúde da API', async () => {
   const response = await request(app).get('/health');

   expect(response.status).toBe(200);
   expect(response.body).toHaveProperty('status', 'ok');
   expect(response.body).toHaveProperty('service', 'bookshelf-api');
 });

 test('deve listar livros', async () => {
   const response = await request(app).get('/books');

   expect(response.status).toBe(200);
   expect(Array.isArray(response.body)).toBe(true);
 });

 test('deve retornar métricas gerais', async () => {
   const response = await request(app).get('/metrics');

   expect(response.status).toBe(200);
   expect(response.body).toHaveProperty('totalBooks');
   expect(response.body).toHaveProperty('booksByStatus');
   expect(response.body).toHaveProperty('booksByCategory');
   expect(response.body).toHaveProperty('averageRating');
 });
});
