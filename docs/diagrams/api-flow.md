# Fluxo da aplicação

Diagramas Mermaid representando os principais fluxos entre usuário, frontend, backend e respostas da API.

## Fluxo geral da aplicação

```mermaid
flowchart TD
    U([Usuário]) -->|Acessa o browser| FE[Frontend\nReact + Vite]
    FE -->|HTTP Request| BE[Backend\nNode.js + Express]
    BE -->|Valida e processa| MEM[(Dados em memória)]
    MEM -->|Retorna dados| BE
    BE -->|HTTP Response JSON| FE
    FE -->|Renderiza interface| U
```

## Fluxo de requisição — GET /books

```mermaid
sequenceDiagram
    actor U as Usuário
    participant FE as Frontend
    participant BE as Backend
    participant MEM as Memória

    U->>FE: Acessa lista de livros
    FE->>BE: GET /books?status=reading&category=software
    BE->>BE: Valida query params (status, category)
    alt Parâmetro inválido
        BE-->>FE: 400 { error: "Status inválido" }
        FE-->>U: Exibe mensagem de erro
    else Parâmetros válidos
        BE->>MEM: Filtra livros
        MEM-->>BE: Lista filtrada
        BE-->>FE: 200 [ { id, title, author, ... } ]
        FE-->>U: Renderiza BookList + BookCard
    end
```

## Fluxo de requisição — POST /books

```mermaid
sequenceDiagram
    actor U as Usuário
    participant FE as Frontend
    participant BE as Backend
    participant MEM as Memória

    U->>FE: Preenche formulário e clica em Cadastrar
    FE->>BE: POST /books { title, author, category, status, rating }
    BE->>BE: Valida campos obrigatórios (title, author)
    BE->>BE: Valida category e status (enum)
    alt Validação falhou
        BE-->>FE: 400 { error: "Campo obrigatório: title" }
        FE-->>U: Exibe erro de validação
    else Dados válidos
        BE->>MEM: Insere novo livro com id auto-incrementado
        MEM-->>BE: Livro salvo
        BE-->>FE: 201 { id, title, author, category, status, rating, createdAt }
        FE-->>U: Exibe livro cadastrado
    end
```

## Fluxo de requisição — PATCH /books/:id/status

```mermaid
sequenceDiagram
    actor U as Usuário
    participant FE as Frontend
    participant BE as Backend
    participant MEM as Memória

    U->>FE: Altera status de um livro
    FE->>BE: PATCH /books/1/status { status: "finished" }
    BE->>MEM: Busca livro pelo ID
    alt Livro não encontrado
        BE-->>FE: 404 { error: "Livro não encontrado" }
        FE-->>U: Exibe erro 404
    else Livro encontrado
        BE->>BE: Valida novo status (enum)
        alt Status inválido
            BE-->>FE: 400 { error: "Status inválido" }
            FE-->>U: Exibe erro de validação
        else Status válido
            BE->>MEM: Atualiza status do livro
            MEM-->>BE: Livro atualizado
            BE-->>FE: 200 { id, title, ..., status: "finished" }
            FE-->>U: Exibe status atualizado
        end
    end
```

## Fluxo de requisição — DELETE /books/:id

```mermaid
sequenceDiagram
    actor U as Usuário
    participant FE as Frontend
    participant BE as Backend
    participant MEM as Memória

    U->>FE: Clica em remover livro
    FE->>BE: DELETE /books/2
    BE->>MEM: Busca livro pelo ID
    alt Livro não encontrado
        BE-->>FE: 404 { error: "Livro não encontrado" }
        FE-->>U: Exibe erro 404
    else Livro encontrado
        BE->>MEM: Remove livro da lista
        MEM-->>BE: Lista atualizada
        BE-->>FE: 204 No Content
        FE-->>U: Remove card da interface
    end
```

## Fluxo do pipeline CI/CD

```mermaid
flowchart LR
    PR([Push / Pull Request\npara main]) --> B[job: backend\nlint → test → build]
    PR --> F[job: frontend\nlint → test → build]
    PR --> D[job: docs\nvalidação de links]

    B --> DEP{Todos\npassaram?}
    F --> DEP
    D --> DEP

    DEP -->|Sim + push para main| DEPLOY[job: deploy]
    DEP -->|Não| FAIL([Pipeline falhou])
    DEPLOY --> PROD([Ambiente de produção])
```

## Mapa de endpoints

```mermaid
graph LR
    API[BookShelf API\nlocalhost:3000]

    API --> H["GET /health\n→ 200 status: ok"]
    API --> GL["GET /books\n→ 200 lista de livros\n→ 400 filtro inválido"]
    API --> PL["POST /books\n→ 201 livro criado\n→ 400 dados inválidos"]
    API --> GI["GET /books/:id\n→ 200 livro\n→ 404 não encontrado"]
    API --> PS["PATCH /books/:id/status\n→ 200 livro atualizado\n→ 400 status inválido\n→ 404 não encontrado"]
    API --> DL["DELETE /books/:id\n→ 204 removido\n→ 404 não encontrado"]
    API --> ME["GET /metrics\n→ 200 métricas"]
```
