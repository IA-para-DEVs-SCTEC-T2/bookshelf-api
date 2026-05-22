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

describe('DELETE /books/:id', () => {
 async function createBook(status) {
   const response = await request(app)
     .post('/books')
     .send({ title: 'Livro Teste', author: 'Autor', category: 'software', status, rating: 3 });
   return response.body.id;
 }

 test('deve retornar 404 quando o livro não existe', async () => {
   // Arrange
   const idInexistente = 99999;

   // Act
   const response = await request(app).delete(`/books/${idInexistente}`);

   // Assert
   expect(response.status).toBe(404);
   expect(response.body).toHaveProperty('error', 'Livro não encontrado');
 });

 test('deve retornar 409 quando o livro está com status borrowed', async () => {
   // Arrange
   const id = await createBook('borrowed');

   // Act
   const response = await request(app).delete(`/books/${id}`);

   // Assert
   expect(response.status).toBe(409);
   expect(response.body).toHaveProperty('error', 'Livro está emprestado');
 });

 test('deve retornar 409 quando o livro está com status reading', async () => {
   // Arrange
   const id = await createBook('reading');

   // Act
   const response = await request(app).delete(`/books/${id}`);

   // Assert
   expect(response.status).toBe(409);
   expect(response.body).toHaveProperty('error', 'Livro em leitura não pode ser removido diretamente');
 });

 test('deve retornar 204 quando o livro é removido com sucesso', async () => {
   // Arrange
   const id = await createBook('unread');

   // Act
   const response = await request(app).delete(`/books/${id}`);

   // Assert
   expect(response.status).toBe(204);
   expect(response.body).toEqual({});
 });
});
