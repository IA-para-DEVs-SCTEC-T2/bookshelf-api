# 📚 Bookshelf API

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18-000000?style=flat&logo=express&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat)
![Status](https://img.shields.io/badge/status-ativo-brightgreen?style=flat)

API REST para gerenciamento de uma estante de livros digital. Permite cadastrar livros, controlar o status de leitura, filtrar por categoria e acompanhar métricas da sua coleção — tudo em memória, sem necessidade de banco de dados.

---

## Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e configuração](#instalação-e-configuração)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Rotas da API](#rotas-da-api)
- [Exemplos de requisição](#exemplos-de-requisição)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Scripts disponíveis](#scripts-disponíveis)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## Funcionalidades

- ✅ Listar todos os livros com filtro por **status** e **categoria**
- ✅ Buscar um livro pelo **ID**
- ✅ Cadastrar um novo livro com título, autor, categoria, status e avaliação
- ✅ Atualizar o **status de leitura** de um livro
- ✅ Remover um livro da estante
- ✅ Consultar **métricas** da coleção (total, por status, por categoria e média de avaliação)
- ✅ Endpoint de **health check** para monitoramento da API
- ✅ Documentação interativa via **Swagger UI** em `/docs`

---

## Tecnologias utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| [Node.js](https://nodejs.org/) | 18+ | Runtime JavaScript |
| [Express](https://expressjs.com/) | 4.18 | Framework HTTP |
| [cors](https://www.npmjs.com/package/cors) | 2.8 | Liberação de origens cruzadas |
| [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) | 5.0 | Documentação interativa |
| [yamljs](https://www.npmjs.com/package/yamljs) | 0.3 | Leitura do arquivo OpenAPI |
| [Jest](https://jestjs.io/) | 29 | Testes automatizados |
| [Supertest](https://www.npmjs.com/package/supertest) | 6.3 | Testes de requisições HTTP |
| [ESLint](https://eslint.org/) | 8.57 | Padronização de código |

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) — versão 18 ou superior
- [npm](https://www.npmjs.com/) — incluído com o Node.js
- [Git](https://git-scm.com/)

Verifique as instalações:

```bash
node -v
npm -v
git --version
```

---

## Instalação e configuração

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
```

### 2. Acessar a pasta do backend

```bash
cd bookshelf-api/backend
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Configurar variáveis de ambiente

Crie um arquivo `.env` na pasta `backend` com base no exemplo abaixo:

```bash
cp .env.example .env
```

> Veja a seção [Variáveis de ambiente](#variáveis-de-ambiente) para detalhes de cada campo.

### 5. Iniciar o servidor

**Modo padrão:**

```bash
npm start
```

**Modo de desenvolvimento** (reinicia automaticamente ao salvar):

```bash
npm install -g nodemon
nodemon src/server.js
```

O servidor estará disponível em: `http://localhost:3000`

A documentação Swagger estará em: `http://localhost:3000/docs`

---

## Variáveis de ambiente

| Variável | Descrição | Exemplo |
|---|---|---|
| `PORT` | Porta em que a API vai rodar | `3000` |

Exemplo de arquivo `.env`:

```env
PORT=3000
```

> Se o arquivo `.env` não for criado, a API usará a porta `3000` por padrão.

---

## Rotas da API

### Health Check

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/health` | Verifica se a API está no ar |

**Resposta `200`:**
```json
{
  "status": "ok",
  "service": "bookshelf-api"
}
```

---

### Livros — `/books`

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/books` | Lista todos os livros |
| `GET` | `/books?status=reading` | Filtra por status de leitura |
| `GET` | `/books?category=software` | Filtra por categoria |
| `GET` | `/books/:id` | Busca um livro pelo ID |
| `POST` | `/books` | Cadastra um novo livro |
| `PATCH` | `/books/:id/status` | Atualiza o status de leitura |
| `DELETE` | `/books/:id` | Remove um livro |

**Valores aceitos para `status`:** `unread` · `reading` · `finished`

**Valores aceitos para `category`:** `software` · `architecture` · `data` · `career`

---

#### `GET /books`

**Resposta `200`:**
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

**Erros comuns:**

| Status | Mensagem |
|---|---|
| `400` | `"Status inválido"` |
| `400` | `"Categoria inválida"` |

---

#### `GET /books/:id`

**Resposta `200`:**
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

**Erros comuns:**

| Status | Mensagem |
|---|---|
| `404` | `"Livro não encontrado"` |

---

#### `POST /books`

**Body (obrigatório):**
```json
{
  "title": "The Pragmatic Programmer",
  "author": "Andrew Hunt",
  "category": "software",
  "status": "unread",
  "rating": 4
}
```

> `title`, `author`, `category` e `status` são obrigatórios. `rating` é opcional (padrão: `0`).

**Resposta `201`:**
```json
{
  "id": 4,
  "title": "The Pragmatic Programmer",
  "author": "Andrew Hunt",
  "category": "software",
  "status": "unread",
  "rating": 4,
  "createdAt": "2026-05-19T10:00:00.000Z"
}
```

**Erros comuns:**

| Status | Mensagem |
|---|---|
| `400` | `"Campo obrigatório: title"` |
| `400` | `"Campo obrigatório: author"` |
| `400` | `"Categoria inválida"` |
| `400` | `"Status inválido"` |

---

#### `PATCH /books/:id/status`

**Body (obrigatório):**
```json
{
  "status": "finished"
}
```

**Resposta `200`:** retorna o livro atualizado.

**Erros comuns:**

| Status | Mensagem |
|---|---|
| `400` | `"Status inválido"` |
| `404` | `"Livro não encontrado"` |

---

#### `DELETE /books/:id`

**Resposta `204`:** sem corpo.

**Erros comuns:**

| Status | Mensagem |
|---|---|
| `404` | `"Livro não encontrado"` |

---

### Métricas — `/metrics`

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/metrics` | Retorna métricas da estante |

**Resposta `200`:**
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

## Exemplos de requisição

### cURL

**Listar todos os livros:**
```bash
curl http://localhost:3000/books
```

**Filtrar livros por status:**
```bash
curl "http://localhost:3000/books?status=reading"
```

**Buscar livro por ID:**
```bash
curl http://localhost:3000/books/1
```

**Cadastrar um novo livro:**
```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Domain-Driven Design","author":"Eric Evans","category":"architecture","status":"unread","rating":5}'
```

**Atualizar status de leitura:**
```bash
curl -X PATCH http://localhost:3000/books/1/status \
  -H "Content-Type: application/json" \
  -d '{"status":"finished"}'
```

**Remover um livro:**
```bash
curl -X DELETE http://localhost:3000/books/2
```

**Consultar métricas:**
```bash
curl http://localhost:3000/metrics
```

---

### fetch (JavaScript)

**Cadastrar um novo livro:**
```js
const response = await fetch('http://localhost:3000/books', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Domain-Driven Design',
    author: 'Eric Evans',
    category: 'architecture',
    status: 'unread',
    rating: 5
  })
});

const book = await response.json();
console.log(book);
```

**Atualizar status:**
```js
const response = await fetch('http://localhost:3000/books/1/status', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ status: 'finished' })
});

const updated = await response.json();
console.log(updated);
```

---

## Estrutura de pastas

```
bookshelf-api/
├── backend/
│   ├── src/
│   │   ├── app.js          # Configuração do Express, middlewares e rotas
│   │   └── server.js       # Inicialização do servidor HTTP
│   ├── tests/
│   │   └── books.test.js   # Testes automatizados com Jest e Supertest
│   ├── openapi.yaml        # Especificação OpenAPI 3.0 (Swagger)
│   ├── eslint.config.js    # Configuração do ESLint
│   └── package.json        # Dependências e scripts do projeto
├── docs/
│   ├── ARCHITECTURE.md     # Visão geral da arquitetura
│   ├── INSTALLATION.md     # Guia detalhado de instalação
│   ├── CLASSROOM_CHALLENGES.md
│   └── diagrams/
│       └── api-flow.md     # Diagrama Mermaid do fluxo da API
└── README.md
```

---

## Scripts disponíveis

Execute dentro da pasta `backend`:

| Script | Comando | Descrição |
|---|---|---|
| Iniciar servidor | `npm start` | Sobe a API com `node` |
| Rodar testes | `npm test` | Executa os testes com Jest |
| Verificar sintaxe | `npm run build` | Valida a sintaxe dos arquivos JS |
| Lint | `npm run lint` | Analisa o código com ESLint |

---

## Contribuição

1. Faça um fork do repositório
2. Crie uma branch para sua feature ou correção:
   ```bash
   git checkout -b feat/nome-da-feature
   ```
3. Faça as alterações e commit:
   ```bash
   git commit -m "feat: descrição da mudança"
   ```
4. Envie para o seu fork:
   ```bash
   git push origin feat/nome-da-feature
   ```
5. Abra um **Pull Request** descrevendo o que foi alterado e por quê.

> Siga o padrão de commits [Conventional Commits](https://www.conventionalcommits.org/).

---

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
