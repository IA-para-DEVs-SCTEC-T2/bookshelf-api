# BookShelf API

Aplicação full-stack demonstrativa para gerenciamento de livros em uma estante digital. Criada com fins didáticos para praticar desenvolvimento backend e frontend, testes automatizados e pipeline CI/CD.

## Tecnologias utilizadas

- Node.js + Express (backend)
- React + Vite (frontend)
- Jest + Supertest (testes do backend)
- Vitest + Testing Library (testes do frontend)
- GitHub Actions (CI/CD)
- OpenAPI + Mermaid (documentação)

## Funcionalidades

- Listar todos os livros (com filtro por status e categoria)
- Buscar livro por ID
- Cadastrar novo livro
- Alterar status de um livro
- Remover livro
- Consultar métricas da estante
- Verificar saúde da API

## Estrutura de pastas

```
bookshelf-api/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/
│   │   └── books.test.js
│   ├── openapi.yaml
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── App.test.jsx
│   │   └── main.jsx
│   └── package.json
├── docs/
│   ├── ARCHITECTURE.md
│   ├── INSTALLATION.md
│   └── diagrams/
│       └── api-flow.md
├── .github/
│   └── workflows/
│       └── ci.yml
└── README.md
```

## Como instalar

```bash
git clone <url-do-repositorio>
cd bookshelf-api
```

Instale as dependências do backend e do frontend:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Como executar

### Backend

```bash
cd backend
npm start
```

O servidor será iniciado em `http://localhost:3000`.

### Frontend

```bash
cd frontend
npm run dev
```

## Endpoints principais

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /health | Verifica a saúde da API |
| GET | /books | Lista todos os livros |
| GET | /books/:id | Busca livro por ID |
| POST | /books | Cadastra novo livro |
| PATCH | /books/:id/status | Altera status de um livro |
| DELETE | /books/:id | Remove um livro (retorna `409` se o livro estiver com status `reading`) |
| GET | /metrics | Consulta métricas da estante |

## Exemplos de requisição

### Listar livros

```bash
curl http://localhost:3000/books
```

### Filtrar por status

```bash
curl http://localhost:3000/books?status=reading
```

### Buscar livro por ID

```bash
curl http://localhost:3000/books/1
```

### Cadastrar livro

```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title": "Domain-Driven Design", "author": "Eric Evans", "category": "software", "status": "unread", "rating": 5}'
```

### Alterar status

```bash
curl -X PATCH http://localhost:3000/books/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "finished"}'
```

### Remover livro

```bash
curl -X DELETE http://localhost:3000/books/1
```

> Retorna `409 Conflict` se o livro estiver com status `reading`. Retorna `204 No Content` quando removido com sucesso.

### Consultar métricas

```bash
curl http://localhost:3000/metrics
```

## Observações finais

- Os dados são armazenados em memória e serão perdidos ao reiniciar o servidor.
- O projeto possui pipeline CI/CD configurado com GitHub Actions para lint, testes e build.
- A documentação da API está disponível em `backend/openapi.yaml` no formato OpenAPI 3.0.
- O script `npm run docs:live` gera automaticamente um prompt com o `git diff` para atualizar a documentação impactada por mudanças no código.
- Ideal para praticar criação de rotas, verbos HTTP, testes automatizados e organização de projetos full-stack.
