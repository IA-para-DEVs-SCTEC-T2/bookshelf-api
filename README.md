# Bookshelf API

API REST para gerenciamento de uma estante digital de livros, com frontend React para visualização e cadastro.

---

## Visão Geral

O sistema permite cadastrar, listar, atualizar e remover livros de uma estante pessoal. Cada livro possui título, autor, categoria, status de leitura e avaliação. A API expõe também um endpoint de métricas agregadas da coleção.

> **Limitação atual**: os dados são armazenados **em memória**. Ao reiniciar o servidor, todos os registros adicionados são perdidos e a coleção retorna ao estado inicial com 3 livros de exemplo.

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Backend runtime | Node.js 18+ |
| Backend framework | Express 4 |
| Frontend | React 18 + Vite 5 |
| Testes (backend) | Jest + Supertest |
| Testes (frontend) | Vitest + React Testing Library |
| Linting | ESLint 8 |

---

## Arquitetura

O backend é uma **API monolítica Express.js**. Toda a lógica (rotas, validações, handlers) está concentrada em `backend/src/app.js`. Não há camadas separadas de controllers, services ou repositórios.

```
Requisição HTTP
    └── Express middleware (CORS, JSON parser)
        └── Route handler em app.js
            ├── Validação inline
            ├── Operação na array em memória
            └── Resposta JSON
```

O frontend é uma SPA React com dados **hardcoded** — não há integração real com o backend neste momento.

---

## Estrutura do Projeto

```
bookshelf-api/
├── backend/
│   ├── src/
│   │   ├── app.js        # Express app: todas as rotas e handlers
│   │   └── server.js     # Inicialização do servidor HTTP
│   ├── tests/
│   │   └── books.test.js # Testes de integração (Jest + Supertest)
│   ├── openapi.yaml      # Especificação OpenAPI 3.0
│   ├── eslint.config.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Componente raiz com layout e dados mockados
│   │   ├── main.jsx          # Entry point React
│   │   ├── components/
│   │   │   └── BookCard.jsx  # Card de exibição de livro
│   │   └── pages/
│   │       ├── Dashboard.jsx # Métricas (Total, A ler, Lendo, Finalizados)
│   │       ├── BookList.jsx  # Listagem de livros
│   │       └── NewBook.jsx   # Formulário de cadastro (UI apenas, sem API)
│   ├── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── package.json
└── docs/
    ├── architecture.md       # Diagramas Mermaid de arquitetura
    ├── endpoints.md          # Referência completa dos endpoints
    ├── errors.md             # Padrão de erros e códigos
    ├── environment.md        # Variáveis de ambiente
    ├── openapi.yaml          # Especificação OpenAPI
    ├── INSTALLATION.md       # Guia detalhado de instalação
    └── diagrams/
        └── api-flow.md       # Diagrama de fluxo da requisição
```

---

## Pré-requisitos

- Node.js 18 ou superior
- npm 9 ou superior

Verifique suas versões:

```bash
node --version
npm --version
```

---

## Instalação e Setup

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd bookshelf-api
```

### 2. Instale as dependências do backend

```bash
cd backend
npm install
```

### 3. Instale as dependências do frontend

```bash
cd ../frontend
npm install
```

### 4. Configuração de ambiente (opcional)

O backend aceita a variável de ambiente `PORT`. Sem configuração, usa a porta `3000`.

```bash
# Exemplo: rodar na porta 8080
PORT=8080 npm start
```

Não há arquivo `.env` necessário. Veja [docs/environment.md](docs/environment.md) para detalhes.

---

## Como Rodar

### Backend (desenvolvimento)

```bash
cd backend
npm start
```

Servidor disponível em: `http://localhost:3000`

Valide que está rodando:

```bash
curl http://localhost:3000/health
# { "status": "ok", "service": "bookshelf-api" }
```

### Frontend (desenvolvimento)

```bash
cd frontend
npm run dev
```

Interface disponível em: `http://localhost:5173`

> O frontend não consome a API do backend neste momento. Os dados exibidos são estáticos.

---

## Scripts

### Backend (`backend/package.json`)

| Script | Comando | Descrição |
|---|---|---|
| `start` | `node src/server.js` | Inicia o servidor |
| `test` | `jest` | Executa os testes de integração |
| `lint` | `eslint src tests` | Verifica estilo de código |
| `build` | `node -c src/app.js && node -c src/server.js` | Valida sintaxe dos arquivos JS |

### Frontend (`frontend/package.json`)

| Script | Comando | Descrição |
|---|---|---|
| `dev` | `vite --host 0.0.0.0` | Inicia servidor de desenvolvimento |
| `build` | `vite build` | Gera build de produção |
| `test` | `vitest run` | Executa testes unitários |
| `lint` | `eslint src` | Verifica estilo de código |

---

## Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/books` | Lista livros (filtros opcionais) |
| POST | `/books` | Cadastra novo livro |
| GET | `/books/:id` | Retorna livro por ID |
| PATCH | `/books/:id/status` | Atualiza status do livro |
| DELETE | `/books/:id` | Remove livro |
| GET | `/metrics` | Métricas agregadas da estante |

Documentação completa: [docs/endpoints.md](docs/endpoints.md)

---

## Modelo de Dados

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

**Categorias válidas**: `software`, `architecture`, `data`, `career`

**Status válidos**: `unread`, `reading`, `finished`

---

## Padrão de Respostas

**Sucesso:**

```json
// Objeto único
{ "id": 1, "title": "...", ... }

// Array
[{ "id": 1, ... }, { "id": 2, ... }]
```

**Erro:**

```json
{ "error": "mensagem descritiva" }
```

Documentação completa de erros: [docs/errors.md](docs/errors.md)

---

## Testes

### Backend

```bash
cd backend
npm test
```

Testes cobertos:
- `GET /health` — retorna 200 com status `ok`
- `GET /books` — retorna 200 com array
- `GET /metrics` — retorna 200 com propriedades esperadas

### Frontend

```bash
cd frontend
npm test
```

---

## OpenAPI

A especificação completa está em [docs/openapi.yaml](docs/openapi.yaml).

Para visualizar interativamente:

```bash
npx @redocly/cli preview-docs docs/openapi.yaml
```

---

## Limitações Conhecidas

| Limitação | Detalhe |
|---|---|
| Dados voláteis | Armazenamento in-memory; dados perdidos ao reiniciar |
| Sem autenticação | Todos os endpoints são públicos |
| Frontend desconectado | UI usa dados hardcoded, não consome a API |
| Sem paginação | `GET /books` retorna todos os registros |
| IDs não persistidos | O contador de ID reinicia junto com o servidor |

---

## Como Contribuir

1. Crie uma branch a partir de `main`
2. Faça suas alterações
3. Execute `npm run lint` e `npm test` no backend
4. Abra um Pull Request descrevendo o que foi alterado
