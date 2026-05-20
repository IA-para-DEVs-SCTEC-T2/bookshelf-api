# Erros — Bookshelf API

Documentação do padrão de erros e todos os casos de erro possíveis.

---

## Padrão de Resposta de Erro

Todos os erros retornam um objeto JSON com a propriedade `error`:

```json
{
  "error": "mensagem descritiva do erro"
}
```

Não há envelope adicional, código de erro numérico interno ou stack trace exposto.

---

## Tabela Completa de Erros

| Endpoint | Método | Status HTTP | Condição | Mensagem |
|---|---|---|---|---|
| `/books` | GET | 400 | Query param `status` com valor não permitido | `"Status inválido"` |
| `/books` | GET | 400 | Query param `category` com valor não permitido | `"Categoria inválida"` |
| `/books` | POST | 400 | Campo `title` ausente ou string vazia | `"Campo obrigatório: title"` |
| `/books` | POST | 400 | Campo `author` ausente ou string vazia | `"Campo obrigatório: author"` |
| `/books` | POST | 400 | Campo `category` ausente ou valor não permitido | `"Categoria inválida"` |
| `/books` | POST | 400 | Campo `status` ausente ou valor não permitido | `"Status inválido"` |
| `/books/:id` | GET | 404 | ID não encontrado na coleção | `"Livro não encontrado"` |
| `/books/:id/status` | PATCH | 400 | Campo `status` com valor não permitido | `"Status inválido"` |
| `/books/:id/status` | PATCH | 404 | ID não encontrado na coleção | `"Livro não encontrado"` |
| `/books/:id` | DELETE | 404 | ID não encontrado na coleção | `"Livro não encontrado"` |

---

## Detalhamento dos Códigos

### 400 — Bad Request

Retornado quando a requisição contém dados inválidos ou incompletos. A validação é feita de forma inline nos handlers de rota, com retorno antecipado (early return) assim que a primeira violação é detectada.

**Valores válidos para `status`:** `unread`, `reading`, `finished`

**Valores válidos para `category`:** `software`, `architecture`, `data`, `career`

**Regra para campos string:** o campo deve ser do tipo string e não pode ser vazio ou composto apenas de espaços.

### 404 — Not Found

Retornado quando um livro com o ID informado não existe na coleção em memória. Como os dados são voláteis, um livro pode desaparecer se o servidor for reiniciado.

---

## Ausência de Middleware Global de Erros

O projeto **não possui** um middleware de tratamento de erros centralizado (como `app.use((err, req, res, next) => {...})`). Cada handler trata seus próprios erros diretamente.

Erros não tratados (como exceções internas inesperadas) podem resultar em resposta 500 padrão do Express ou encerramento do processo — isso não foi mapeado como comportamento intencional da aplicação.

---

## Exemplos

### Erro de validação ao criar livro

```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title": "Clean Code", "author": "Martin", "category": "invalida", "status": "unread"}'
```

```json
HTTP/1.1 400 Bad Request
{ "error": "Categoria inválida" }
```

### Livro não encontrado

```bash
curl http://localhost:3000/books/9999
```

```json
HTTP/1.1 404 Not Found
{ "error": "Livro não encontrado" }
```
