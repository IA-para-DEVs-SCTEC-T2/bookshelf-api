# Fluxo da Aplicação

```mermaid
flowchart TD
    A[Usuário] --> B[Frontend React]
    B -->|Requisição HTTP| C[API Express]
    C --> D{Rotas}
    D --> E[GET /health]
    D --> F[GET /books]
    D --> G[POST /books]
    D --> H[PATCH /books/:id/status]
    D --> I[DELETE /books/:id]
    D --> J[GET /metrics]
    E --> K[Dados em memória]
    F --> K
    G --> K
    H --> K
    I --> K
    J --> K
    K -->|Resposta JSON| C
    C -->|Resposta HTTP| B
    B --> A
```

## Remoção de livro

Este fluxo representa a rota `DELETE /books/:id`.

```mermaid
sequenceDiagram
    participant Cliente
    participant API
    participant Memoria as Memória (books)

    Cliente->>API: DELETE /books/:id
    API->>Memoria: Busca livro pelo ID

    alt Livro não encontrado
        API-->>Cliente: 404 Livro não encontrado
    else Livro em leitura
        API-->>Cliente: 409 Livro em leitura não pode ser removido diretamente
    else Livro removível
        API->>Memoria: Remove livro da lista
        API-->>Cliente: 204 No Content
    end
```
