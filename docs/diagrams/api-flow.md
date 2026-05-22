# Fluxo da aplicação — BookShelf API

## Fluxo geral entre usuário, frontend e backend

```mermaid
graph TD
    U([Usuário]) -->|Interage com a UI| FE[Frontend\nReact + Vite\n:5173]
    FE -->|HTTP Request| BE[Backend\nNode + Express\n:5000]
    BE -->|JSON Response| FE
    FE -->|Renderiza resultado| U

    BE -->|GET /api-docs| SW[Swagger UI]
    SW -->|Documentação interativa| U
```

## Fluxo detalhado por operação

### Listar livros — GET /books

```mermaid
sequenceDiagram
    participant C as Cliente
    participant API as Backend

    C->>API: GET /books?status=reading&category=software
    API->>API: Valida parâmetros de query
    alt Parâmetro inválido
        API-->>C: 400 { error: "Status inválido" }
    else Parâmetros válidos
        API->>API: Filtra array books[]
        API-->>C: 200 [ ...livros ]
    end
```

### Criar livro — POST /books

```mermaid
sequenceDiagram
    participant C as Cliente
    participant API as Backend

    C->>API: POST /books { title, author, category, status, rating }
    API->>API: Valida title (string não vazia)
    API->>API: Valida author (string não vazia)
    API->>API: Valida category (enum)
    API->>API: Valida status (enum)
    alt Validação falhou
        API-->>C: 400 { error: "Campo obrigatório: title" }
    else Dados válidos
        API->>API: Cria livro com id e createdAt
        API-->>C: 201 { id, title, author, category, status, rating, createdAt }
    end
```

### Remover livro — DELETE /books/:id

```mermaid
sequenceDiagram
    participant C as Cliente
    participant API as Backend

    C->>API: DELETE /books/:id
    API->>API: Busca livro por ID
    alt Livro não encontrado
        API-->>C: 404 { error: "Livro não encontrado" }
    else Livro com status "reading"
        API-->>C: 409 { error: "Livros com status reading não podem ser removidos diretamente" }
    else Livro encontrado e removível
        API->>API: Remove do array books[]
        API-->>C: 204 No Content
    end
```

### Atualizar status — PATCH /books/:id/status

```mermaid
sequenceDiagram
    participant C as Cliente
    participant API as Backend

    C->>API: PATCH /books/:id/status { status }
    API->>API: Busca livro por ID
    alt Livro não encontrado
        API-->>C: 404 { error: "Livro não encontrado" }
    else Status inválido
        API-->>C: 400 { error: "Status inválido" }
    else Válido
        API->>API: Atualiza book.status
        API-->>C: 200 { ...livro atualizado }
    end
```

## Fluxo do pipeline CI/CD

```mermaid
graph LR
    P([push / PR\npara main]) --> B[Job: backend\nlint + test + build]
    P --> F[Job: frontend\nlint + test + build]
    P --> D[Job: docs\nvalida arquivos]

    B --> DEP{Deploy}
    F --> DEP
    D --> DEP

    DEP -->|Apenas push na main\nse todos passarem| R([Deploy\nexecutado])
    DEP -->|Qualquer job falhou| X([Deploy\nbloqueado])
```
