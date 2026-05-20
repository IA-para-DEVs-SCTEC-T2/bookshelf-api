# Fluxo da Aplicação — Bookshelf API

Diagrama de fluxo completo de uma requisição HTTP ao backend.

---

## Fluxo Geral de Requisição

```mermaid
sequenceDiagram
    participant C as Cliente (curl / browser)
    participant MW1 as cors()
    participant MW2 as express.json()
    participant R as Route Handler (app.js)
    participant A as Array books[]

    C->>MW1: HTTP Request
    MW1->>MW2: Injeta headers CORS na resposta
    MW2->>R: Parseia body JSON
    R->>R: Valida campos
    alt Dados inválidos
        R-->>C: 400 { error: "..." }
    else ID não encontrado
        R-->>C: 404 { error: "Livro não encontrado" }
    else OK
        R->>A: Lê / escreve / deleta
        A-->>R: Resultado
        R-->>C: 200 / 201 / 204 + JSON
    end
```

---

## Fluxo de Criação de Livro (POST /books)

```mermaid
flowchart TD
    A[POST /books] --> B{title presente e não-vazio?}
    B -- Não --> E1[400: Campo obrigatório: title]
    B -- Sim --> C{author presente e não-vazio?}
    C -- Não --> E2[400: Campo obrigatório: author]
    C -- Sim --> D{category válida?}
    D -- Não --> E3[400: Categoria inválida]
    D -- Sim --> F{status válido?}
    F -- Não --> E4[400: Status inválido]
    F -- Sim --> G[Cria objeto Book com id e createdAt]
    G --> H[push em books array]
    H --> I[201: retorna livro criado]
```

---

## Fluxo de Listagem com Filtros (GET /books)

```mermaid
flowchart TD
    A[GET /books] --> B{query param status?}
    B -- Presente --> C{status é válido?}
    C -- Não --> E1[400: Status inválido]
    C -- Sim --> D{query param category?}
    B -- Ausente --> D
    D -- Presente --> F{category é válida?}
    F -- Não --> E2[400: Categoria inválida]
    F -- Sim --> G[Filtra array por status e/ou category]
    D -- Ausente --> G
    G --> H[200: retorna array filtrada]
```

---

## Ciclo de Vida dos Dados

```mermaid
graph TD
    I[Inicialização do servidor] --> S[books = 3 livros seed]
    S --> R[Runtime: array em memória]
    R -->|POST /books| ADD[Adiciona livro]
    R -->|DELETE /books/:id| DEL[Remove livro]
    R -->|PATCH /books/:id/status| UPD[Atualiza status]
    R -->|Servidor reinicia| RESET[Array volta ao estado inicial]
    ADD --> R
    DEL --> R
    UPD --> R
```
