# 🔄 Fluxo da Aplicação BookShelf-API

## Diagrama do Fluxo Completo

```mermaid
flowchart TD
    A["👤 Usuário"] -->|Interage| B["⚛️ Frontend React<br/>visualizar/cadastrar/editar livros"]
    B -->|Requisição HTTP| C["🔄 API Express<br/>localhost:5000"]
    
    C -->|GET /health| D1["✓ Health Check"]
    C -->|GET /books| D2["📚 Listar Livros"]
    C -->|POST /books| D3["➕ Cadastrar Livro"]
    C -->|GET /books/:id| D4["🔍 Buscar por ID"]
    C -->|PATCH /books/:id/status| D5["✏️ Alterar Status"]
    C -->|DELETE /books/:id| D6["🗑️ Deletar Livro"]
    C -->|GET /metrics| D7["📊 Obter Métricas"]
    
    D1 -->|Valida| E["🔐 Processamento"]
    D2 -->|Valida| E
    D3 -->|Valida| E
    D4 -->|Valida| E
    D5 -->|Valida| E
    D6 -->|Valida| E
    D7 -->|Calcula| E
    
    E -->|Lê/Escreve| F["💾 Dados em Memória<br/>Array de Livros"]
    
    F -->|Retorna| G["📋 JSON Response<br/>200, 201, 204, 400, 404"]
    G -->|Resposta HTTP| B
    
    B -->|Renderiza| H["🎨 Interface com dados<br/>Tabelas, Forms, Cards"]
    H -->|Exibe| A
    
    style A fill:#e1f5ff
    style B fill:#c8e6c9
    style C fill:#fff9c4
    style E fill:#ffccbc
    style F fill:#f8bbd0
    style G fill:#ede7f6
    style H fill:#c8e6c9
    style D1 fill:#b3e5fc
    style D2 fill:#b3e5fc
    style D3 fill:#b3e5fc
    style D4 fill:#b3e5fc
    style D5 fill:#b3e5fc
    style D6 fill:#b3e5fc
    style D7 fill:#b3e5fc
```

## Resumo do Fluxo

1. **Usuário** interage com o Frontend React
2. **Frontend** envia requisição HTTP para a API Express em localhost:5000
3. **API** processa 7 rotas diferentes (Health, Listar, Criar, Buscar, Atualizar, Deletar, Métricas)
4. **Processamento** valida os dados
5. **Dados em Memória** (Array) é lido/escrito
6. **Resposta JSON** retorna ao Frontend com status HTTP apropriado
7. **Interface React** renderiza os dados
8. **Usuário** visualiza a tela atualizada

## Características

- ✅ Sem banco de dados externo
- ✅ Sem autenticação
- ✅ Sem serviços externos
- ✅ Dados persistem apenas durante a execução
- ✅ Todas as 7 rotas da API representadas
- ✅ Validações e tratamento de erros inclusos

---

**Nota:** Para mais detalhes sobre casos de uso específicos, consulte [casos-uso.md](casos-uso.md)
