# Arquitetura — Bookshelf API

Documentação da estrutura arquitetural do projeto `bookshelf-api`.

---

## Visão Geral

O projeto é composto por dois serviços independentes:

- **Backend**: API REST Express.js (monolítica, in-memory)
- **Frontend**: SPA React com dados hardcoded (sem integração real com o backend)

---

## Fluxo de Requisição HTTP

Cada requisição ao backend percorre o seguinte caminho dentro de `backend/src/app.js`:

```mermaid
sequenceDiagram
    participant Cliente
    participant CORS as Middleware: cors()
    participant JSON as Middleware: express.json()
    participant Route as Route Handler (app.js)
    participant Memory as Array em Memória (books[])

    Cliente->>CORS: HTTP Request
    CORS->>JSON: Adiciona headers CORS
    JSON->>Route: Parseia body JSON
    Route->>Route: Valida campos obrigatórios
    alt Validação falha
        Route-->>Cliente: 400 { error: "..." }
    else Validação OK
        Route->>Memory: Lê / escreve na array books[]
        Memory-->>Route: Dados retornados
        Route-->>Cliente: 200/201/204 com JSON
    end
```

---

## Estrutura de Módulos do Backend

```mermaid
graph TD
    A[server.js] -->|cria e inicia| B[app.js]
    B -->|registra| C[cors middleware]
    B -->|registra| D[express.json middleware]
    B -->|define rotas| E[GET /health]
    B -->|define rotas| F[GET /books]
    B -->|define rotas| G[POST /books]
    B -->|define rotas| H[GET /books/:id]
    B -->|define rotas| I[PATCH /books/:id/status]
    B -->|define rotas| J[DELETE /books/:id]
    B -->|define rotas| K[GET /metrics]
    F -->|lê| L[(books array)]
    G -->|escreve| L
    H -->|lê| L
    I -->|atualiza| L
    J -->|remove de| L
    K -->|agrega| L
```

---

## Armazenamento de Dados

Não há banco de dados. Os dados vivem em uma array JavaScript declarada em `app.js`:

```mermaid
graph TD
    A[Inicialização do servidor]
    A --> B[books = 3 livros iniciais]
    A --> C[nextBookId = 4]
    B --> D{Operações em runtime}
    D -->|POST /books| E[push no array + incrementa nextBookId]
    D -->|DELETE /books/:id| F[splice no array]
    D -->|PATCH /books/:id/status| G[atualiza objeto no array]
    D -->|Servidor reinicia| H[Array resetada para estado inicial]
```

> Os dados não são persistidos. Reiniciar o servidor restaura os 3 livros de exemplo.

---

## Fluxo de Validação (POST /books)

```mermaid
flowchart TD
    A[POST /books] --> B{title é string não-vazia?}
    B -->|Não| ERR1[400: Campo obrigatório: title]
    B -->|Sim| C{author é string não-vazia?}
    C -->|Não| ERR2[400: Campo obrigatório: author]
    C -->|Sim| D{category é válida?}
    D -->|Não| ERR3[400: Categoria inválida]
    D -->|Sim| E{status é válido?}
    E -->|Não| ERR4[400: Status inválido]
    E -->|Sim| F[Cria livro com id e createdAt]
    F --> G[Adiciona ao array books]
    G --> H[201: retorna livro criado]
```

---

## Estrutura do Frontend

```mermaid
graph TD
    A[main.jsx] --> B[App.jsx]
    B --> C[Dashboard.jsx]
    B --> D[BookList.jsx]
    B --> E[NewBook.jsx]
    D --> F[BookCard.jsx]
    B -->|dados hardcoded| G[Array estática em App.jsx]
    G --> C
    G --> D
```

> O frontend não faz chamadas HTTP ao backend. Os dados são uma array estática definida dentro de `App.jsx`.

---

## Entidade Principal: Book

```mermaid
graph TD
    Book["Book
    ────────────────
    id: integer
    title: string
    author: string
    category: enum
    status: enum
    rating: number 0-5
    createdAt: ISO 8601"]

    Category["category
    ─────────────────
    software
    architecture
    data
    career"]

    Status["status
    ──────────────
    unread
    reading
    finished"]

    Book --> Category
    Book --> Status
```

---

## Decisões Arquiteturais Notáveis

| Decisão | Detalhe |
|---|---|
| Monólito sem camadas | Todo o código de rota, validação e lógica está em `app.js` |
| In-memory storage | Simplicidade para fins didáticos; sem persistência |
| CORS aberto | `cors()` sem restrição de origem — adequado para desenvolvimento |
| Sem autenticação | Todos os endpoints são públicos |
| Frontend desacoplado | O frontend não integra com a API neste momento |
