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
| DELETE | /books/:id | Remove um livro |
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

> **Atenção:** livros com status `reading` não podem ser removidos diretamente. A tentativa retorna `409 Conflict` com a mensagem `"Livro em leitura não pode ser removido diretamente"`.

### Consultar métricas

```bash
curl http://localhost:3000/metrics
```

## Observações finais

- Os dados são armazenados em memória e serão perdidos ao reiniciar o servidor.
- O projeto possui pipeline CI/CD configurado com GitHub Actions para lint, testes e build.
- A documentação da API está disponível em `backend/openapi.yaml` no formato OpenAPI 3.0.
- Ideal para praticar criação de rotas, verbos HTTP, testes automatizados e organização de projetos full-stack.

## Scripts disponíveis

### Backend

| Script | Comando | Descrição |
|--------|---------|-----------|
| Iniciar servidor | `npm start` | Inicia a API em `http://localhost:3000` |
| Testes | `npm test` | Executa a suíte de testes com Jest |
| Build | `npm run build` | Valida a sintaxe dos arquivos principais |
| Lint | `npm run lint` | Verifica o código com ESLint |
| Docs viva | `npm run docs:live` | Gera prompt de atualização de documentação baseado no `git diff` atual |

---

## Histórico de alterações

- [x] `README.md` — criado e atualizado com descrição, tecnologias, funcionalidades, estrutura, instalação, execução, endpoints, exemplos e scripts
- [x] `docs/INSTALLATION.md` — criado com pré-requisitos, clone, instalação, modos de execução, health check, testes, lint, build e problemas comuns
- [x] `docs/diagrams/api-flow.md` — criado com diagrama Mermaid `flowchart TD` do fluxo entre Usuário, Frontend React, API Express e Dados em memória
- [x] `docs/diagrams/use-case.md` — criado com diagrama Mermaid `flowchart LR` de casos de uso do sistema
- [x] `docs/diagrams/sequence-diagram.md` — criado com diagrama Mermaid `sequenceDiagram` do fluxo de cadastro de livro (sucesso e erro)
- [x] `backend/openapi.yaml` — reescrito com OpenAPI 3.0.0 cobrindo todos os 7 endpoints, schemas reutilizáveis, `operationId`, `security: []` e respostas 4XX em todas as operações
- [x] `backend/src/app.js` — adicionada integração com Swagger UI via `swagger-ui-express` e `yamljs`, expondo documentação interativa em `/api-docs`
- [x] `backend/package.json` — adicionadas dependências `swagger-ui-express@5.0.1` e `yamljs@0.3.0`; adicionado script `docs:live`
- [x] `scripts/docs-live.sh` — criado script que captura o `git diff` e gera prompt de atualização de documentação em `.tmp/docs-live/docs-live.generated.md`
- [x] `docs/prompts/docs-live-update.md` — criado template de prompt para o fluxo de documentação viva
- [x] `.gitignore` — adicionada entrada `.tmp/` para ignorar arquivos temporários gerados pelo script `docs:live`
