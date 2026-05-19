const request = require('supertest');
const app = require('../src/app');

// ─────────────────────────────────────────────
// GET /health
// ─────────────────────────────────────────────
describe('GET /health', () => {
  test('deve retornar status de saúde da API', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('service', 'bookshelf-api');
  });
});

// ─────────────────────────────────────────────
// GET /books
// ─────────────────────────────────────────────
describe('GET /books', () => {
  test('deve listar todos os livros', async () => {
    const response = await request(app).get('/books');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('cada livro deve ter os campos esperados', async () => {
    const response = await request(app).get('/books');
    const book = response.body[0];

    expect(book).toHaveProperty('id');
    expect(book).toHaveProperty('title');
    expect(book).toHaveProperty('author');
    expect(book).toHaveProperty('category');
    expect(book).toHaveProperty('status');
    expect(book).toHaveProperty('rating');
    expect(book).toHaveProperty('createdAt');
  });

  test('deve filtrar livros por status válido', async () => {
    const response = await request(app).get('/books?status=reading');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((book) => {
      expect(book.status).toBe('reading');
    });
  });

  test('deve filtrar livros por categoria válida', async () => {
    const response = await request(app).get('/books?category=software');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((book) => {
      expect(book.category).toBe('software');
    });
  });

  test('deve filtrar livros por status e categoria combinados', async () => {
    const response = await request(app).get('/books?status=unread&category=software');

    expect(response.status).toBe(200);
    response.body.forEach((book) => {
      expect(book.status).toBe('unread');
      expect(book.category).toBe('software');
    });
  });

  test('deve retornar 400 para status inválido', async () => {
    const response = await request(app).get('/books?status=invalido');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Status inválido');
  });

  test('deve retornar 400 para categoria inválida', async () => {
    const response = await request(app).get('/books?category=invalida');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Categoria inválida');
  });
});

// ─────────────────────────────────────────────
// POST /books
// ─────────────────────────────────────────────
describe('POST /books', () => {
  test('deve cadastrar um novo livro com todos os campos', async () => {
    const payload = {
      title: 'Domain-Driven Design',
      author: 'Eric Evans',
      category: 'architecture',
      status: 'unread',
      rating: 5,
    };

    const response = await request(app).post('/books').send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(payload.title);
    expect(response.body.author).toBe(payload.author);
    expect(response.body.category).toBe(payload.category);
    expect(response.body.status).toBe(payload.status);
    expect(response.body.rating).toBe(payload.rating);
    expect(response.body).toHaveProperty('createdAt');
  });

  test('deve cadastrar livro sem rating e usar 0 como padrão', async () => {
    const payload = {
      title: 'Refactoring',
      author: 'Martin Fowler',
      category: 'software',
      status: 'unread',
    };

    const response = await request(app).post('/books').send(payload);

    expect(response.status).toBe(201);
    expect(response.body.rating).toBe(0);
  });

  test('deve retornar 400 quando title está ausente', async () => {
    const response = await request(app).post('/books').send({
      author: 'Autor',
      category: 'software',
      status: 'unread',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Campo obrigatório: title');
  });

  test('deve retornar 400 quando title é string vazia', async () => {
    const response = await request(app).post('/books').send({
      title: '   ',
      author: 'Autor',
      category: 'software',
      status: 'unread',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Campo obrigatório: title');
  });

  test('deve retornar 400 quando author está ausente', async () => {
    const response = await request(app).post('/books').send({
      title: 'Título',
      category: 'software',
      status: 'unread',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Campo obrigatório: author');
  });

  test('deve retornar 400 para categoria inválida', async () => {
    const response = await request(app).post('/books').send({
      title: 'Título',
      author: 'Autor',
      category: 'invalida',
      status: 'unread',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Categoria inválida');
  });

  test('deve retornar 400 para status inválido', async () => {
    const response = await request(app).post('/books').send({
      title: 'Título',
      author: 'Autor',
      category: 'software',
      status: 'invalido',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Status inválido');
  });
});

// ─────────────────────────────────────────────
// GET /books/:id
// ─────────────────────────────────────────────
describe('GET /books/:id', () => {
  test('deve retornar um livro existente pelo ID', async () => {
    const response = await request(app).get('/books/1');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('author');
  });

  test('deve retornar 404 para ID inexistente', async () => {
    const response = await request(app).get('/books/99999');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Livro não encontrado');
  });
});

// ─────────────────────────────────────────────
// PATCH /books/:id/status
// ─────────────────────────────────────────────
describe('PATCH /books/:id/status', () => {
  test('deve atualizar o status de um livro existente', async () => {
    const response = await request(app)
      .patch('/books/1/status')
      .send({ status: 'finished' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('status', 'finished');
  });

  test('deve retornar 400 para status inválido', async () => {
    const response = await request(app)
      .patch('/books/1/status')
      .send({ status: 'invalido' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Status inválido');
  });

  test('deve retornar 404 para ID inexistente', async () => {
    const response = await request(app)
      .patch('/books/99999/status')
      .send({ status: 'reading' });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Livro não encontrado');
  });
});

// ─────────────────────────────────────────────
// DELETE /books/:id
// ─────────────────────────────────────────────
describe('DELETE /books/:id', () => {
  test('deve remover um livro existente e retornar 204', async () => {
    // Cria um livro para deletar sem afetar os dados dos outros testes
    const created = await request(app).post('/books').send({
      title: 'Livro para deletar',
      author: 'Autor Teste',
      category: 'career',
      status: 'unread',
    });

    const id = created.body.id;
    const deleteResponse = await request(app).delete(`/books/${id}`);

    expect(deleteResponse.status).toBe(204);
  });

  test('livro deletado não deve mais aparecer na listagem', async () => {
    const created = await request(app).post('/books').send({
      title: 'Livro temporário',
      author: 'Autor Teste',
      category: 'data',
      status: 'unread',
    });

    const id = created.body.id;
    await request(app).delete(`/books/${id}`);

    const getResponse = await request(app).get(`/books/${id}`);
    expect(getResponse.status).toBe(404);
  });

  test('deve retornar 404 ao deletar ID inexistente', async () => {
    const response = await request(app).delete('/books/99999');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Livro não encontrado');
  });
});

// ─────────────────────────────────────────────
// GET /metrics
// ─────────────────────────────────────────────
describe('GET /metrics', () => {
  test('deve retornar métricas com todos os campos esperados', async () => {
    const response = await request(app).get('/metrics');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('totalBooks');
    expect(response.body).toHaveProperty('booksByStatus');
    expect(response.body).toHaveProperty('booksByCategory');
    expect(response.body).toHaveProperty('averageRating');
  });

  test('booksByStatus deve conter os três status possíveis', async () => {
    const response = await request(app).get('/metrics');
    const { booksByStatus } = response.body;

    expect(booksByStatus).toHaveProperty('unread');
    expect(booksByStatus).toHaveProperty('reading');
    expect(booksByStatus).toHaveProperty('finished');
  });

  test('booksByCategory deve conter as quatro categorias possíveis', async () => {
    const response = await request(app).get('/metrics');
    const { booksByCategory } = response.body;

    expect(booksByCategory).toHaveProperty('software');
    expect(booksByCategory).toHaveProperty('architecture');
    expect(booksByCategory).toHaveProperty('data');
    expect(booksByCategory).toHaveProperty('career');
  });

  test('totalBooks deve ser um número inteiro não negativo', async () => {
    const response = await request(app).get('/metrics');

    expect(typeof response.body.totalBooks).toBe('number');
    expect(response.body.totalBooks).toBeGreaterThanOrEqual(0);
  });

  test('averageRating deve ser um número entre 0 e 5', async () => {
    const response = await request(app).get('/metrics');
    const { averageRating } = response.body;

    expect(typeof averageRating).toBe('number');
    expect(averageRating).toBeGreaterThanOrEqual(0);
    expect(averageRating).toBeLessThanOrEqual(5);
  });
});
