# Arquitetura

Visão geral da estrutura técnica da aplicação BookShelf API — um projeto full-stack demonstrativo para gerenciamento de livros em uma estante digital.

## Estrutura de pastas

```
bookshelf-api/
├── backend/                  # API REST em Node.js + Express
│   ├── src/
│   │   ├── app.js            # Definição de rotas e middlewares
│   │   └── server.js         # Inicialização do servidor HTTP
│   ├── tests/
│   │   └── books.test.js     # Testes de integração com Jest + Supertest
│   ├── openapi.yaml          # Especificação OpenAPI 3.0
│   └── package.json
├── frontend/                 # SPA em React + Vite
│   ├── src/
│   │   ├── App.jsx           # Componente raiz e estilos globais
│   │   ├── components/
│   │   │   └── BookCard.jsx  # Card de exibição de um livro
│   │   └── pages/
│   │       ├── Dashboard.jsx # Métricas da estante
│   │       ├── BookList.jsx  # Lista de livros cadastrados
│   │       └── NewBook.jsx   # Formulário de cadastro
│   ├── vite.config.js
│   └── package.json
├── docs/                     # Documentação técnica
│   ├── ARCHITECTURE.md
│   ├── INSTALLATION.md
│   ├── CLASSROOM_CHALLENGES.md
│   └── diagrams/
│       └── api-flow.md       # Diagrama Mermaid do fluxo da API
├── .github/
│   └── workflows/
│       └── ci.yml            # Pipeline CI/CD com GitHub Actions
└── README.md
```

## Backend

**Runtime:** Node.js 20  
**Framework:** Express 4  
**Porta padrão:** `3000` (configurável via variável de ambiente `PORT`)

O backend é uma API REST stateless com dados em memória (sem banco de dados). O estado é reiniciado a cada restart do processo — comportamento intencional para fins didáticos.

### Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/health` | Verifica se a API está operacional |
| `GET` | `/books` | Lista livros com filtros opcionais por `status` e `category` |
| `POST` | `/books` | Cadastra um novo livro |
| `GET` | `/books/:id` | Retorna um livro pelo ID |
| `PATCH` | `/books/:id/status` | Atualiza o status de um livro |
| `DELETE` | `/books/:id` | Remove um livro |
| `GET` | `/metrics` | Retorna métricas agregadas da estante |

### Validações

- `title` e `author`: strings não vazias (obrigatórios no POST)
- `status`: enum `unread | reading | finished`
- `category`: enum `software | architecture | data | career`
- `rating`: número entre 0 e 5 (opcional, padrão `0`)

### Separação de responsabilidades

- `app.js` — configura middlewares (`cors`, `express.json`), define todas as rotas e exporta a instância do app para uso nos testes
- `server.js` — importa o app e chama `app.listen()`, separando a inicialização do servidor da lógica de negócio

## Frontend

**Framework:** React 18  
**Bundler:** Vite 5  
**Porta padrão de desenvolvimento:** `5173`

A interface é uma SPA (Single Page Application) estática, atualmente com dados mockados diretamente no componente `App.jsx`. Não há integração com a API em tempo de execução nesta versão demonstrativa.

### Componentes

| Componente | Responsabilidade |
|------------|-----------------|
| `App.jsx` | Composição das páginas, dados mock e estilos globais inline |
| `Dashboard.jsx` | Exibe métricas: total, não lidos, em leitura, finalizados |
| `BookList.jsx` | Renderiza a lista de livros usando `BookCard` |
| `BookCard.jsx` | Card individual com título, autor, categoria, status e avaliação |
| `NewBook.jsx` | Formulário estático de cadastro (sem submit implementado) |

## Testes

| Camada | Framework | Arquivo |
|--------|-----------|---------|
| Backend | Jest + Supertest | `backend/tests/books.test.js` |
| Frontend | Vitest + Testing Library | `frontend/src/App.test.jsx` |

Os testes de backend fazem requisições HTTP reais contra o app Express sem subir um servidor de rede, usando o Supertest diretamente sobre a instância exportada por `app.js`.

O ambiente de testes do frontend usa `jsdom` (configurado no `vite.config.js`) para simular o DOM do navegador.

## Pipeline CI/CD

O pipeline é definido em `.github/workflows/ci.yml` e executa em todo `push` e `pull_request` para a branch `main`.

```
push / pull_request → main
        │
        ├── job: backend   (lint → test → build → upload openapi.yaml)
        ├── job: frontend  (lint → test → build → upload dist/)
        └── job: docs      (validação de links Markdown)
                │
                └── job: deploy  (apenas em push para main, após os 3 jobs acima)
```

Todos os jobs usam Node.js 20 e cache de dependências via `npm ci`.

## Documentação

A especificação da API segue o padrão **OpenAPI 3.0** e está em `backend/openapi.yaml`. Ela documenta todos os endpoints, schemas, parâmetros, respostas de sucesso e erros.

## Limitações

- **Persistência:** os dados ficam em memória e são perdidos ao reiniciar o processo
- **Autenticação:** não há controle de acesso implementado
- **Frontend desconectado:** a interface não consome a API em runtime; usa dados estáticos
- **Deploy:** o job de deploy no CI contém apenas um placeholder — requer configuração específica do ambiente de destino
