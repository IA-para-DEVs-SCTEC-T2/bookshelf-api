# BookShelf API

Uma API REST simples e didática para gerenciamento de livros em uma estante digital, desenvolvida com Node.js e Express.

## 📋 Descrição

BookShelf API é uma aplicação backend que permite gerenciar uma coleção de livros. Com ela, você pode listar livros, buscar por ID, cadastrar novos livros, alterar status de leitura e consultar métricas sobre sua estante.

A API foi desenvolvida com foco em boas práticas de desenvolvimento, incluindo validação de dados, tratamento de erros e testes automatizados.

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web minimalista
- **CORS** - Middleware para compartilhamento de recursos entre origens
- **Jest** - Framework de testes
- **Supertest** - Biblioteca para testes de HTTP
- **ESLint** - Ferramenta de linting para código limpo

## ✨ Funcionalidades

- ✅ Listar todos os livros com filtros por status e categoria
- ✅ Buscar um livro específico pelo ID
- ✅ Cadastrar novos livros com validação de dados
- ✅ Alterar o status de leitura de um livro
- ✅ Remover livros da estante
- ✅ Consultar métricas (total de livros, distribuição por status/categoria, avaliação média)
- ✅ Verificar saúde da API

## 📁 Estrutura de Pastas

```
bookshelf-api/
├── backend/
│   ├── src/
│   │   ├── app.js          # Configuração da aplicação Express
│   │   └── server.js       # Inicialização do servidor
│   ├── tests/
│   │   └── books.test.js   # Testes automatizados
│   ├── package.json        # Dependências do projeto
│   ├── eslint.config.js    # Configuração do linter
│   └── openapi.yaml        # Documentação OpenAPI
├── frontend/               # Aplicação frontend (não abordada neste README)
├── docs/                   # Documentação adicional
└── README.md              # Este arquivo
```

## 🚀 Como Instalar

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)

### Passos de Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/bookshelf-api.git
cd bookshelf-api/backend
```

2. Instale as dependências:
```bash
npm install
```

3. Verifique se tudo está funcionando:
```bash
npm run build
```

## ▶️ Como Executar

### Iniciar o servidor

```bash
npm start
```

O servidor iniciará na porta **3000** por padrão. Você verá uma mensagem como:
```
Servidor rodando em http://localhost:3000
```

### Executar testes

```bash
npm test
```

### Verificar qualidade do código

```bash
npm run lint
```

## 📡 Endpoints Principais

### 1. Verificar Saúde da API

```
GET /health
```

Retorna o status da API.

**Resposta (200):**
```json
{
  "status": "ok",
  "service": "bookshelf-api"
}
```

---

### 2. Listar Todos os Livros

```
GET /books
```

Lista todos os livros cadastrados. Suporta filtros opcionais.

**Parâmetros de Query (opcionais):**
- `status` - Filtra por status: `unread`, `reading`, `finished`
- `category` - Filtra por categoria: `software`, `architecture`, `data`, `career`

**Resposta (200):**
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

### 3. Buscar Livro por ID

```
GET /books/:id
```

Retorna um livro específico pelo seu ID.

**Parâmetros:**
- `id` - ID do livro (número inteiro)

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

**Resposta (404):**
```json
{
  "error": "Livro não encontrado"
}
```

---

### 4. Cadastrar Novo Livro

```
POST /books
```

Cria um novo livro na estante.

**Body (obrigatório):**
```json
{
  "title": "Design Patterns",
  "author": "Gang of Four",
  "category": "software",
  "status": "unread",
  "rating": 4
}
```

**Campos obrigatórios:**
- `title` - Título do livro (string não vazia)
- `author` - Autor do livro (string não vazia)
- `category` - Categoria: `software`, `architecture`, `data`, `career`
- `status` - Status: `unread`, `reading`, `finished`

**Campos opcionais:**
- `rating` - Avaliação de 0 a 5 (padrão: 0)

**Resposta (201):**
```json
{
  "id": 4,
  "title": "Design Patterns",
  "author": "Gang of Four",
  "category": "software",
  "status": "unread",
  "rating": 4,
  "createdAt": "2026-05-19T14:30:00.000Z"
}
```

**Resposta (400):**
```json
{
  "error": "Campo obrigatório: title"
}
```

---

### 5. Alterar Status de um Livro

```
PATCH /books/:id/status
```

Atualiza o status de leitura de um livro.

**Parâmetros:**
- `id` - ID do livro (número inteiro)

**Body (obrigatório):**
```json
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

### 6. Remover um Livro

```
DELETE /books/:id
```

Remove um livro da estante.

**Parâmetros:**
- `id` - ID do livro (número inteiro)

**Resposta (204):**
Sem conteúdo (sucesso)

**Resposta (404):**
```json
{
  "error": "Livro não encontrado"
}
```

---

### 7. Consultar Métricas

```
GET /metrics
```

Retorna estatísticas sobre a estante de livros.

**Resposta (200):**
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

## 📝 Exemplos de Requisição

### Exemplo 1: Listar livros com filtro de status

```bash
curl -X GET "http://localhost:3000/books?status=reading"
```

### Exemplo 2: Cadastrar um novo livro

```bash
curl -X POST "http://localhost:3000/books" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Refactoring",
    "author": "Martin Fowler",
    "category": "software",
    "status": "unread",
    "rating": 5
  }'
```

### Exemplo 3: Alterar status de um livro

```bash
curl -X PATCH "http://localhost:3000/books/1/status" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "finished"
  }'
```

### Exemplo 4: Consultar métricas

```bash
curl -X GET "http://localhost:3000/metrics"
```

## 📌 Observações Finais

- **Dados em Memória**: Os dados são armazenados em memória durante a execução. Ao reiniciar o servidor, os dados voltam ao estado inicial.
- **Validação**: A API valida todos os dados de entrada e retorna mensagens de erro claras.
- **CORS Habilitado**: A API permite requisições de qualquer origem (útil para desenvolvimento com frontend).
- **Testes**: Execute `npm test` para rodar a suite de testes e garantir que tudo está funcionando corretamente.
- **Documentação OpenAPI**: Consulte o arquivo `openapi.yaml` para uma documentação técnica completa da API.

---

**Desenvolvido com ❤️ para fins educacionais**
