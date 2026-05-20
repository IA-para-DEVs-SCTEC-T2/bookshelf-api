# Endpoints — Bookshelf API

Referência completa de todos os endpoints disponíveis na API.

**Base URL**: `http://localhost:3000`

**Autenticação**: Nenhuma. Todos os endpoints são públicos.

**Content-Type**: `application/json`

---

## GET /health

Verifica se a API está operacional.

**Resposta 200:**

```json
{
  "status": "ok",
  "service": "bookshelf-api"
}
```

---

## GET /books

Lista todos os livros da estante. Suporta filtros opcionais por query string.

**Query Parameters:**

| Parâmetro | Tipo | Obrigatório | Valores válidos | Descrição |
|---|---|---|---|---|
| `status` | string | Não | `unread`, `reading`, `finished` | Filtra por status |
| `category` | string | Não | `software`, `architecture`, `data`, `career` | Filtra por categoria |

Os dois filtros podem ser combinados.

**Resposta 200:**

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

Retorna array vazia `[]` se nenhum livro corresponder ao filtro.

**Resposta 400** — filtro com valor inválido:

```json
{ "error": "Status inválido" }
{ "error": "Categoria inválida" }
```

**Exemplos:**

```bash
# Todos os livros
GET /books

# Apenas livros não lidos
GET /books?status=unread

# Livros de arquitetura que já foram finalizados
GET /books?category=architecture&status=finished
```

---

## POST /books

Cadastra um novo livro.

**Request Body:**

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `title` | string | Sim | Título do livro (não-vazio) |
| `author` | string | Sim | Autor do livro (não-vazio) |
| `category` | string | Sim | `software`, `architecture`, `data` ou `career` |
| `status` | string | Sim | `unread`, `reading` ou `finished` |
| `rating` | number | Não | Avaliação de 0 a 5 (padrão: 0) |

```json
{
  "title": "The Pragmatic Programmer",
  "author": "Andrew Hunt",
  "category": "software",
  "status": "unread",
  "rating": 4
}
```

**Resposta 201:**

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

**Resposta 400** — campos inválidos:

```json
{ "error": "Campo obrigatório: title" }
{ "error": "Campo obrigatório: author" }
{ "error": "Categoria inválida" }
{ "error": "Status inválido" }
```

---

## GET /books/:id

Retorna um livro pelo seu ID.

**Path Parameters:**

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `id` | integer | ID do livro |

**Resposta 200:**

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

**Resposta 404:**

```json
{ "error": "Livro não encontrado" }
```

---

## PATCH /books/:id/status

Atualiza o status de leitura de um livro.

**Path Parameters:**

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `id` | integer | ID do livro |

**Request Body:**

| Campo | Tipo | Obrigatório | Valores válidos |
|---|---|---|---|
| `status` | string | Sim | `unread`, `reading`, `finished` |

```json
{
  "status": "finished"
}
```

**Resposta 200** — livro atualizado:

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

**Resposta 400:**

```json
{ "error": "Status inválido" }
```

**Resposta 404:**

```json
{ "error": "Livro não encontrado" }
```

---

## DELETE /books/:id

Remove um livro pelo ID.

**Path Parameters:**

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `id` | integer | ID do livro |

**Resposta 204** — sem body (livro removido com sucesso).

**Resposta 404:**

```json
{ "error": "Livro não encontrado" }
```

---

## GET /metrics

Retorna métricas agregadas da estante de livros.

**Resposta 200:**

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

| Campo | Tipo | Descrição |
|---|---|---|
| `totalBooks` | integer | Total de livros na estante |
| `booksByStatus` | object | Contagem por status |
| `booksByCategory` | object | Contagem por categoria |
| `averageRating` | number | Média das avaliações (2 casas decimais) |

---

## Resumo dos Status HTTP

| Código | Significado | Quando ocorre |
|---|---|---|
| 200 | OK | Leitura ou atualização bem-sucedida |
| 201 | Created | Livro criado com sucesso |
| 204 | No Content | Livro deletado com sucesso |
| 400 | Bad Request | Campo obrigatório ausente ou valor inválido |
| 404 | Not Found | Livro com o ID informado não existe |
