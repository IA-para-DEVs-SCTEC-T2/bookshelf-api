# Diagrama de Caso de Uso

```mermaid
flowchart LR
    U([👤 Usuário])

    subgraph BookShelf["📚 BookShelf"]
        UC1["Visualizar lista de livros"]
        UC2["Cadastrar livro"]
        UC3["Filtrar por status"]
        UC4["Filtrar por categoria"]
        UC5["Buscar livro por ID"]
        UC6["Atualizar status do livro"]
        UC7["Remover livro"]
        UC8["Visualizar métricas da estante"]
    end

    U --> UC1
    U --> UC2
    U --> UC3
    U --> UC4
    U --> UC5
    U --> UC6
    U --> UC7
    U --> UC8
```
