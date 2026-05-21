# Arquitetura

## Visão geral

A BookShelf API é uma aplicação full-stack composta por um backend REST em Node.js/Express e um frontend em React/Vite. Os dados são armazenados em memória no servidor. O projeto inclui testes automatizados, documentação OpenAPI e um pipeline CI/CD com GitHub Actions.

## Estrutura de pastas

```
bookshelf-api/
├── backend/
│   ├── src/
│   │   ├── app.js          # Configuração do Express e rotas
│   │   └── server.js       # Inicialização do servidor
│   ├── tests/
│   │   └── books.test.js   # Testes de integração
│   ├── openapi.yaml        # Especificação OpenAPI 3.0
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── App.jsx         # Componente raiz
│   │   ├── App.test.jsx    # Testes do frontend
│   │   └── main.jsx        # Ponto de entrada
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

## Backend

- **Runtime:** Node.js
- **Framework:** Express
- **Porta padrão:** 5000 (configurável via `process.env.PORT`)
- **Armazenamento:** Array em memória (sem persistência)
- **Rotas disponíveis:**
  - `GET /health` — Health check
  - `GET /books` — Listar livros (filtros: status, category)
  - `GET /books/:id` — Buscar livro por ID
  - `POST /books` — Cadastrar livro
  - `PATCH /books/:id/status` — Alterar status
  - `DELETE /books/:id` — Remover livro
  - `GET /metrics` — Métricas da estante
  - `GET /api-docs` — Swagger UI
- **Documentação interativa:** Swagger UI servido via `swagger-ui-express` + `yamljs`

## Frontend

- **Framework:** React
- **Bundler:** Vite
- **Estrutura:** Componentes em `components/`, páginas em `pages/`
- **Páginas:** Dashboard (métricas), BookList (listagem), NewBook (formulário de cadastro)
- **Comunicação:** Requisições HTTP para o backend

## Testes

| Camada | Ferramenta | Arquivo |
|--------|-----------|---------|
| Backend | Jest + Supertest | `backend/tests/books.test.js` |
| Frontend | Vitest + React Testing Library | `frontend/src/App.test.jsx` |

- Os testes do backend validam os endpoints via requisições HTTP simuladas.
- Os testes do frontend validam a renderização dos componentes.

## Pipeline CI/CD

Arquivo: `.github/workflows/ci.yml`

O pipeline roda em push e pull request para a branch `main` e possui 4 jobs:

1. **backend** — Instala dependências, executa lint, testes, build e valida o `openapi.yaml`.
2. **frontend** — Instala dependências, executa lint, testes e build.
3. **docs** — Verifica a existência dos arquivos de documentação obrigatórios.
4. **deploy** — Executa somente se os três jobs anteriores passarem.

Todos os jobs utilizam Node.js 20.

## Documentação

- `README.md` — Visão geral, instalação e exemplos de uso
- `docs/INSTALLATION.md` — Guia de instalação passo a passo
- `docs/ARCHITECTURE.md` — Este documento
- `docs/diagrams/api-flow.md` — Diagrama Mermaid do fluxo da aplicação
- `backend/openapi.yaml` — Especificação OpenAPI 3.0 da API

## Limitações

- Os dados são armazenados em memória e perdidos ao reiniciar o servidor.
- Não há banco de dados, autenticação, autorização ou controle de sessão.
- Não há Docker ou containerização.
- Não há integração com serviços externos.
- O deploy no pipeline é apenas um placeholder.
