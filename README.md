# BookShelf API

## Descrição

A **BookShelf API** é uma API REST desenvolvida com **Node.js** e **Express** que permite gerenciar uma estante de livros virtual. Com ela é possível cadastrar livros, listar, buscar por ID, atualizar o status de leitura, remover livros e consultar métricas gerais da estante.

Este projeto foi criado com fins didáticos e é ideal para quem está aprendendo a construir APIs REST do zero.

---

## Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| [Node.js](https://nodejs.org/) | Ambiente de execução JavaScript |
| [Express](https://expressjs.com/) | Framework para criação da API |
| [CORS](https://www.npmjs.com/package/cors) | Liberação de acesso entre origens diferentes |
| [Jest](https://jestjs.io/) | Framework de testes |
| [Supertest](https://github.com/ladjs/supertest) | Testes de requisições HTTP |
| [ESLint](https://eslint.org/) | Análise estática e padronização do código |

---

## Funcionalidades

- Listar todos os livros (com filtro opcional por status e categoria)
- Buscar um livro pelo ID
- Cadastrar um novo livro
- Atualizar o status de leitura de um livro
- Remover um livro da estante
- Consultar métricas da estante (total de livros, média de avaliação, agrupamentos por status e categoria)
- Verificar se a API está no ar (`/health`)

---

## Estrutura de pastas

```
backend/
├── src/
│   ├── app.js        # Configuração do Express e definição das rotas
│   └── server.js     # Inicialização do servidor
├── tests/
│   └── books.test.js # Testes automatizados
├── eslint.config.js  # Configuração do ESLint
├── package.json
└── openapi.yaml      # Documentação da API no formato OpenAPI
```

---

## Como instalar

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado (versão 18 ou superior recomendada).

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
```

2. Acesse a pasta do backend:

```bash
cd bookshelf-api/backend
```

3. Instale as dependências:

```bash
npm install
```

---

## Como executar

### Iniciar o servidor

```bash
npm start
```

O servidor será iniciado na porta **3000** por padrão. Você verá a mensagem:

```
BookShelf API running on port 3000
```

Para usar uma porta diferente, defina a variável de ambiente `PORT` antes de iniciar:

```bash
PORT=8080 npm start
```

### Rodar os testes

```bash
npm test
```

### Verificar erros de código com o linter

```bash
npm run lint
```

### Verificar a sintaxe dos arquivos (build)

```bash
npm run build
```

---

## Endpoints principais

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/health` | Verifica se a API está funcionando |
| `GET` | `/books` | Lista todos os livros |
| `GET` | `/books?status=reading` | Filtra livros por status |
| `GET` | `/books?category=software` | Filtra livros por categoria |
| `GET` | `/books/:id` | Busca um livro pelo ID |
| `POST` | `/books` | Cadastra um novo livro |
| `PATCH` | `/books/:id/status` | Atualiza o status de um livro |
| `DELETE` | `/books/:id` | Remove um livro da estante |
| `GET` | `/metrics` | Retorna métricas gerais da estante |

### Valores aceitos

**Status:**
- `unread` — não lido
- `reading` — lendo
- `finished` — finalizado

**Categorias:**
- `software`
- `architecture`
- `data`
- `career`

---

## Exemplos de requisição

### Listar todos os livros

```http
GET http://localhost:3000/books
```

**Resposta:**
```json
[
  {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "category": "software",
    "status": "reading",
    "rating": 5,
    "createdAt": "2026-05-01T10:00:00.000Z"
  }
]
```

---

### Buscar livro por ID

```http
GET http://localhost:3000/books/1
```

**Resposta (200):**
```json
{
  "id": 1,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "category": "software",
  "status": "reading",
  "rating": 5,
  "createdAt": "2026-05-01T10:00:00.000Z"
}
```

**Resposta (404 — livro não encontrado):**
```json
{
  "error": "Livro não encontrado"
}
```

---

### Cadastrar um novo livro

```http
POST http://localhost:3000/books
Content-Type: application/json

{
  "title": "The Pragmatic Programmer",
  "author": "Andrew Hunt",
  "category": "software",
  "status": "unread",
  "rating": 4
}
```

**Resposta (201):**
```json
{
  "id": 4,
  "title": "The Pragmatic Programmer",
  "author": "Andrew Hunt",
  "category": "software",
  "status": "unread",
  "rating": 4,
  "createdAt": "2026-05-19T12:00:00.000Z"
}
```

> Os campos `title`, `author`, `category` e `status` são obrigatórios. O campo `rating` é opcional (padrão: `0`).

---

### Atualizar o status de um livro

```http
PATCH http://localhost:3000/books/1/status
Content-Type: application/json

{
  "status": "finished"
}
```

**Resposta (200):**
```json
{
  "id": 1,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "category": "software",
  "status": "finished",
  "rating": 5,
  "createdAt": "2026-05-01T10:00:00.000Z"
}
```

---

### Remover um livro

```http
DELETE http://localhost:3000/books/1
```

**Resposta (204):** sem corpo.

---

### Consultar métricas da estante

```http
GET http://localhost:3000/metrics
```

**Resposta:**
```json
{
  "totalBooks": 3,
  "booksByStatus": {
    "unread": 1,
    "reading": 1,
    "finished": 1
  },
  "booksByCategory": {
    "software": 2,
    "architecture": 1,
    "data": 0,
    "career": 0
  },
  "averageRating": 4.67
}
```

---

## Observações finais

- Os dados são armazenados **em memória**. Ao reiniciar o servidor, a lista de livros volta ao estado inicial com os três livros de exemplo.
- A API não possui autenticação — qualquer requisição é aceita.
- Para testar os endpoints manualmente, você pode usar ferramentas como [Insomnia](https://insomnia.rest/), [Postman](https://www.postman.com/) ou a extensão **REST Client** do VS Code.
- Os testes automatizados cobrem os principais cenários de sucesso e erro de cada rota.

---

## Checklist de alterações

Checklist de tudo que foi criado ou modificado neste projeto.

### Documentação

- [x] `README.md` — criado com descrição, tecnologias, funcionalidades, estrutura de pastas, instalação, execução, endpoints, exemplos de requisição e observações finais
- [x] `docs/INSTALLATION.md` — criado com pré-requisitos, clone, instalação, modos de execução, health check, testes, lint, build e problemas comuns
- [x] `docs/diagrams/api-flow.md` — criado com diagrama Mermaid `flowchart TD` representando o fluxo completo entre Usuário, Frontend React, API Express e Dados em memória
- [x] `docs/diagrams/use-case.md` — criado com diagrama Mermaid `flowchart LR` de casos de uso do sistema BookShelf
- [x] `docs/diagrams/sequence-diagram.md` — criado com diagrama Mermaid `sequenceDiagram` do fluxo de cadastro de livro (cenário de sucesso e de erro)

### Backend

- [x] `backend/openapi.yaml` — reescrito do zero com OpenAPI 3.0.0 cobrindo todos os 7 endpoints reais da API, schemas reutilizáveis em `components`, `operationId`, `security: []` e respostas 4XX em todas as operações
- [x] `backend/src/app.js` — adicionada integração com Swagger UI via `swagger-ui-express` e `yamljs`, expondo a documentação interativa em `/api-docs`
- [x] `backend/package.json` — adicionadas as dependências `swagger-ui-express@5.0.1` e `yamljs@0.3.0`
