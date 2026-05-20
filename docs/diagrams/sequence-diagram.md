# Diagrama de Sequência — Cadastro de Livro

```mermaid
sequenceDiagram
    actor U as Usuário
    participant F as Frontend React
    participant A as API Express
    participant M as Dados em Memória

    U->>F: Preenche formulário e clica em "Cadastrar livro"

    %% ─── ERRO: campo obrigatório ausente ───────────────────────
    rect rgb(254, 226, 226)
        Note over F,A: Cenário 1 — Campo obrigatório ausente (title ou author vazio)
        F->>A: POST /books { title: "", author: "Eric Evans", category: "software", status: "unread" }
        A->>A: Valida title → isNonEmptyString("") = false
        A-->>F: 400 Bad Request { "error": "Campo obrigatório: title" }
        F-->>U: Exibe mensagem de erro ao usuário
    end

    %% ─── ERRO: valor inválido ───────────────────────────────────
    rect rgb(254, 243, 199)
        Note over F,A: Cenário 2 — Valor inválido (category ou status fora do permitido)
        F->>A: POST /books { title: "Clean Code", author: "Robert C. Martin", category: "fiction", status: "unread" }
        A->>A: Valida category → "fiction" não está em [software, architecture, data, career]
        A-->>F: 400 Bad Request { "error": "Categoria inválida" }
        F-->>U: Exibe mensagem de erro ao usuário
    end

    %% ─── SUCESSO ────────────────────────────────────────────────
    rect rgb(220, 252, 231)
        Note over F,M: Cenário 3 — Cadastro realizado com sucesso
        F->>A: POST /books { title: "Clean Code", author: "Robert C. Martin", category: "software", status: "unread", rating: 5 }
        A->>A: Valida title → OK
        A->>A: Valida author → OK
        A->>A: Valida category → "software" ∈ valores permitidos → OK
        A->>A: Valida status → "unread" ∈ valores permitidos → OK
        A->>M: Salva novo livro no array books[]
        M-->>A: Livro salvo com id gerado
        A-->>F: 201 Created { "id": 4, "title": "Clean Code", "author": "Robert C. Martin", "category": "software", "status": "unread", "rating": 5, "createdAt": "..." }
        F-->>U: Exibe confirmação de cadastro
    end
```
