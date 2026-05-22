# Arquitetura — BookShelf API

## Visão geral

A aplicação é dividida em dois serviços independentes: **backend** (API REST) e **frontend** (SPA React). Eles se comunicam via HTTP e são validados por um pipeline CI/CD no GitHub Actions.

```
┌─────────────┐        HTTP        ┌─────────────────┐
│   Frontend  │ ────────────────▶  │     Backend     │
│  React/Vite │ ◀────────────────  │  Node + Express │
│  porta 5173 │                    │   porta 5000    │
└─────────────┘                    └─────────────────┘
```

## Backend

- **Runtime:** Node.js
- **Framework:** Express 4
- **Dados:** armazenamento em memória (array `books`)
- **Documentação:** Swagger UI servido em `/api-docs` via `swagger-ui-express`
- **Especificação:** `openapi.yaml` (OpenAPI 3.0.3)

### Rotas implementadas

| Método | Rota | Comportamento |
|---|---|---|
| GET | `/health` | Retorna `{ status: "ok", service: "bookshelf-api" }` |
| GET | `/books` | Lista livros com filtro opcional por `status` e `category` |
| POST | `/books` | Cria livro; valida campos obrigatórios e enums |
| GET | `/books/:id` | Busca livro por ID; retorna 404 se não encontrado |
| PATCH | `/books/:id/status` | Atualiza status; valida enum |
| DELETE | `/books/:id` | Remove livro; bloqueia com 409 se status for `reading` |
| GET | `/metrics` | Retorna totais por status, por categoria e média de rating |
| GET | `/api-docs` | Swagger UI interativo |

### Regras de negócio

- `title` e `author` são strings não vazias obrigatórias
- `category` deve ser um de: `software`, `architecture`, `data`, `career`
- `status` deve ser um de: `unread`, `reading`, `finished`
- `rating` é opcional (padrão `0`), aceita valores entre `0` e `5`
- Livros com `status === "reading"` não podem ser deletados (retorna `409 Conflict`)

## Frontend

- **Framework:** React 18
- **Bundler:** Vite 5
- **Páginas:** `Dashboard`, `BookList`, `NewBook`
- **Componentes:** `BookCard`
- **Testes:** Vitest + Testing Library

## Testes

| Camada | Ferramenta | Arquivo |
|---|---|---|
| Backend | Jest + Supertest | `backend/tests/books.test.js` |
| Frontend | Vitest + Testing Library | `frontend/src/App.test.jsx` |

Os testes de backend cobrem: health check, listagem de livros e métricas.

## Pipeline CI/CD

O arquivo `.github/workflows/ci.yml` define quatro jobs:

```
backend ──┐
frontend ──┼──▶ deploy (apenas em push na main)
docs ──────┘
```

- **backend:** `npm ci` → lint → test → build → upload `openapi.yaml`
- **frontend:** `npm ci` → lint → test → build → upload `dist/`
- **docs:** valida existência de `README.md`, `ARCHITECTURE.md` e `INSTALLATION.md`
- **deploy:** executa somente se os três jobs anteriores passarem e o evento for `push` na `main`

## Documentação

| Arquivo | Descrição |
|---|---|
| `README.md` | Visão geral, endpoints e início rápido |
| `docs/ARCHITECTURE.md` | Este arquivo — arquitetura detalhada |
| `docs/INSTALLATION.md` | Passo a passo de instalação e execução |
| `docs/diagrams/api-flow.md` | Diagrama Mermaid do fluxo da API |
| `backend/openapi.yaml` | Especificação OpenAPI 3.0.3 completa |

## Limitações

- Os dados são armazenados em memória; reiniciar o servidor restaura o estado inicial
- Não há autenticação nem autorização
- Não há banco de dados persistente
- O frontend consome a API diretamente via fetch sem gerenciamento de estado global
