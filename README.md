# BookShelf API

## 📖 Descrição

BookShelf API é uma aplicação REST simples e didática desenvolvida com **Node.js** e **Express**. Ela permite gerenciar uma coleção de livros, incluindo operações de listagem, busca, cadastro, alteração de status e consulta de métricas sobre a biblioteca.

Este projeto é ideal para estudantes que desejam aprender os conceitos fundamentais de APIs REST, como requisições HTTP, validação de dados e tratamento de erros.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript para o backend
- **Express** - Framework minimalista para criar APIs REST
- **CORS** - Middleware para permitir requisições entre domínios
- **Jest** - Framework de testes unitários
- **Supertest** - Biblioteca para testes de endpoints HTTP
- **ESLint** - Ferramenta para validação de código

---

## ✨ Funcionalidades

- ✅ **Listar livros** - Obter todos os livros cadastrados com filtros opcionais
- ✅ **Buscar por ID** - Encontrar um livro específico pelo seu identificador
- ✅ **Cadastrar livro** - Adicionar um novo livro à coleção
- ✅ **Alterar status** - Mudar o status de um livro (não lido, lendo, finalizado)
- ✅ **Deletar livro** - Remover um livro da coleção
- ✅ **Consultar métricas** - Visualizar estatísticas sobre a biblioteca (total, por status, por categoria, média de avaliações)
- ✅ **Health check** - Verificar se a API está funcionando

---

## 📁 Estrutura de Pastas

```
backend/
├── src/
│   ├── app.js           # Configuração da aplicação e rotas
│   └── server.js        # Inicialização do servidor
├── tests/
│   └── books.test.js    # Testes dos endpoints
├── package.json         # Dependências do projeto
├── eslint.config.js     # Configuração do linter
└── openapi.yaml         # Documentação da API
```

---

## 🚀 Como Instalar

### Pré-requisitos

Você precisa ter **Node.js** (versão 14 ou superior) instalado em seu computador. [Clique aqui para baixar](https://nodejs.org/).

### Passos

1. **Clone ou extraia o projeto:**
   ```bash
   cd backend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

---

## ▶️ Como Executar

### Modo de Desenvolvimento

Inicie a API na porta 3000 (padrão):

```bash
npm start
```

Você verá a mensagem:
```
BookShelf API running on port 3000
```

### Acessar a API

A API estará disponível em:
```
http://localhost:3000
```

### Executar Testes

Para validar que tudo está funcionando corretamente:

```bash
npm test
```

### Validar Código

Para verificar se o código segue os padrões de qualidade:

```bash
npm run lint
```

---

## 📡 Endpoints Principais

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/health` | Verifica se a API está funcionando |
| `GET` | `/books` | Lista todos os livros com filtros opcionais |
| `POST` | `/books` | Cadastra um novo livro |
| `GET` | `/books/:id` | Busca um livro específico pelo ID |
| `PATCH` | `/books/:id/status` | Altera o status de um livro |
| `DELETE` | `/books/:id` | Deleta um livro |
| `GET` | `/metrics` | Retorna estatísticas da biblioteca |

### Status Permitidos
- `unread` - Não lido
- `reading` - Lendo
- `finished` - Finalizado

### Categorias Disponíveis
- `software` - Desenvolvimento de Software
- `architecture` - Arquitetura
- `data` - Dados
- `career` - Carreira

---

## 💡 Exemplos de Requisição

### 1. Verificar se a API está funcionando

**Requisição:**
```bash
curl -X GET http://localhost:3000/health
```

**Resposta (200 OK):**
```json
{
  "status": "ok",
  "service": "bookshelf-api"
}
```

---

### 2. Listar todos os livros

**Requisição:**
```bash
curl -X GET http://localhost:3000/books
```

**Resposta (200 OK):**
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
  },
  {
    "id": 2,
    "title": "The Pragmatic Programmer",
    "author": "Andrew Hunt and David Thomas",
    "category": "software",
    "status": "unread",
    "rating": 4,
    "createdAt": "2026-05-02T14:30:00.000Z"
  }
]
```

---

### 3. Filtrar livros por status

**Requisição:**
```bash
curl -X GET "http://localhost:3000/books?status=finished"
```

**Resposta (200 OK):**
```json
[
  {
    "id": 3,
    "title": "Designing Data-Intensive Applications",
    "author": "Martin Kleppmann",
    "category": "architecture",
    "status": "finished",
    "rating": 5,
    "createdAt": "2026-05-03T09:15:00.000Z"
  }
]
```

---

### 4. Filtrar livros por categoria

**Requisição:**
```bash
curl -X GET "http://localhost:3000/books?category=software"
```

**Resposta (200 OK):**
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
  },
  {
    "id": 2,
    "title": "The Pragmatic Programmer",
    "author": "Andrew Hunt and David Thomas",
    "category": "software",
    "status": "unread",
    "rating": 4,
    "createdAt": "2026-05-02T14:30:00.000Z"
  }
]
```

---

### 5. Buscar livro por ID

**Requisição:**
```bash
curl -X GET http://localhost:3000/books/1
```

**Resposta (200 OK):**
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

**Resposta (404 Not Found):**
```json
{
  "error": "Livro não encontrado"
}
```

---

### 6. Cadastrar um novo livro

**Requisição:**
```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Cloud Resume Challenge",
    "author": "Forrest Brazeal",
    "category": "career",
    "status": "unread",
    "rating": 4
  }'
```

**Resposta (201 Created):**
```json
{
  "id": 4,
  "title": "The Cloud Resume Challenge",
  "author": "Forrest Brazeal",
  "category": "career",
  "status": "unread",
  "rating": 4,
  "createdAt": "2026-05-19T12:00:00.000Z"
}
```

**Resposta (400 Bad Request):**
```json
{
  "error": "Campo obrigatório: title"
}
```

---

### 7. Alterar status de um livro

**Requisição:**
```bash
curl -X PATCH http://localhost:3000/books/1/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "finished"
  }'
```

**Resposta (200 OK):**
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

### 8. Deletar um livro

**Requisição:**
```bash
curl -X DELETE http://localhost:3000/books/1
```

**Resposta (204 No Content):**
```
(sem corpo)
```

---

### 9. Consultar métricas

**Requisição:**
```bash
curl -X GET http://localhost:3000/metrics
```

**Resposta (200 OK):**
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
  "averageRating": "4.67"
}
```

---

## 📝 Observações Finais

- **Dados em memória:** A API armazena dados na memória RAM. Isso significa que todos os dados serão perdidos quando o servidor for reiniciado.
- **Validações:** A API valida todos os campos obrigatórios e os valores de status e categoria antes de processar requisições.
- **Códigos HTTP:** A API segue os padrões REST para retornar códigos HTTP apropriados:
  - `200` - Requisição bem-sucedida
  - `201` - Recurso criado com sucesso
  - `204` - Requisição bem-sucedida (sem conteúdo)
  - `400` - Requisição inválida (dados faltando ou inválidos)
  - `404` - Recurso não encontrado
- **CORS:** A API está configurada para aceitar requisições de qualquer origem, facilitando testes e aprendizado.
- **Testes:** Utilize os testes unitários para entender como cada endpoint funciona e validar suas mudanças.

---

## 📚 Próximos Passos

Sugestões para expandir seu aprendizado:

1. Adicionar endpoints para atualizar outros campos do livro (título, autor, etc.)
2. Implementar validações mais robustas
3. Adicionar persistência de dados com um banco de dados real
4. Criar testes para casos de erro
5. Implementar autenticação simples
6. Adicionar paginação à listagem de livros

---

**Desenvolvido para fins educacionais** ✨

