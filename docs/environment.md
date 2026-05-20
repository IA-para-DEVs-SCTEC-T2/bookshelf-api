# Variáveis de Ambiente — Bookshelf API

---

## Backend

O backend possui apenas uma variável de ambiente, e ela é opcional.

| Variável | Obrigatória | Padrão | Exemplo | Descrição |
|---|---|---|---|---|
| `PORT` | Não | `3000` | `8080` | Porta em que o servidor HTTP escuta conexões |

### Como definir

Inline ao iniciar o servidor:

```bash
PORT=8080 npm start
```

Ou com arquivo `.env` + biblioteca como `dotenv` (não configurado por padrão — o projeto lê diretamente de `process.env`).

---

## Frontend

O frontend não possui variáveis de ambiente configuradas. A URL da API não está parametrizada, pois o frontend não consome o backend neste momento.

---

## Observações

- Não existe arquivo `.env` ou `.env.example` no projeto
- Não há segredos, tokens, chaves de API ou credenciais de banco de dados — o projeto não utiliza banco de dados nem autenticação
- As constantes como `allowedStatuses` e `allowedCategories` são definidas diretamente no código em `backend/src/app.js` e não são configuráveis via ambiente
