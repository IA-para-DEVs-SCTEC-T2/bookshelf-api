# BookShelf API

Aplicação full-stack demonstrativa para gerenciamento de livros em uma estante digital.

## Stack

- **Backend:** Node.js + Express
- **Frontend:** React + Vite
- **Testes:** Jest, Supertest, Vitest e Testing Library
- **Pipeline:** GitHub Actions
- **Documentação:** OpenAPI 3.0.3 + Swagger UI + Mermaid

## Funcionalidades

- Listar, cadastrar, buscar e remover livros
- Atualizar o status de leitura de um livro
- Filtrar livros por status e categoria
- Visualizar métricas da estante (total, por status, por categoria, média de avaliação)
- Livros com status `reading` não podem ser removidos diretamente

## Regras de negócio

| Regra | Descrição |
|---|---|
| Status válidos | `unread`, `reading`, `finished` |
| Categorias válidas | `software`, `architecture`, `data`, `career` |
| Campos obrigatórios | `title`, `author`, `category`, `status` |
| Rating | Opcional, padrão `0`, intervalo `0–5` |
| Remoção bloqueada | Livros com status `reading` retornam `409 Conflict` |

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/health` | Verifica a saúde da API |
| GET | `/books` | Lista todos os livros (filtros: `status`, `category`) |
| POST | `/books` | Cadastra um novo livro |
| GET | `/books/:id` | Retorna um livro pelo ID |
| PATCH | `/books/:id/status` | Atualiza o status de leitura |
| DELETE | `/books/:id` | Remove um livro (bloqueado se `reading`) |
| GET | `/metrics` | Retorna métricas da estante |
| GET | `/api-docs` | Swagger UI — documentação interativa |

## Estrutura do projeto

```
bookshelf-api/
├── backend/
│   ├── src/
│   │   ├── app.js        # Rotas e lógica da API
│   │   └── server.js     # Inicialização do servidor
│   ├── tests/
│   │   └── books.test.js # Testes com Jest + Supertest
│   └── openapi.yaml      # Especificação OpenAPI 3.0.3
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   └── pages/
│   └── index.html
├── docs/
│   ├── ARCHITECTURE.md
│   ├── INSTALLATION.md
│   └── diagrams/
│       └── api-flow.md
└── .github/
    └── workflows/
        └── ci.yml
```

## Início rápido

Consulte [docs/INSTALLATION.md](docs/INSTALLATION.md) para instruções completas de instalação e execução.

## Documentação interativa

Com o servidor rodando, acesse:

```
http://localhost:5000/api-docs
```

## Objetivo da prática

Este projeto é usado para criar documentação técnica e validar um pipeline CI/CD com GitHub Actions.
