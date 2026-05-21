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
