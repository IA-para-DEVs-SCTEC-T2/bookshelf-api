# Instalação

Guia para rodar a aplicação BookShelf API localmente.

## Pré-requisitos

- [Node.js 20+](https://nodejs.org/)
- npm 10+ (incluído com o Node.js)
- Git

Verifique as versões instaladas:

```bash
node -v
npm -v
```

## Clonar o repositório

```bash
git clone https://github.com/IA-para-DEVs-SCTEC-T2/bookshelf-api.git
cd bookshelf-api
```

## Backend

### Instalar dependências

```bash
cd backend
npm install
```

### Iniciar o servidor

```bash
npm start
```

O servidor sobe na porta `3000` por padrão. Para usar outra porta:

```bash
PORT=8080 npm start
```

Confirme que está rodando:

```bash
curl http://localhost:3000/health
# {"status":"ok","service":"bookshelf-api"}
```

### Rodar os testes

```bash
npm test
```

### Lint

```bash
npm run lint
```

### Build (verificação de sintaxe)

```bash
npm run build
```

## Frontend

Abra um novo terminal a partir da raiz do projeto:

### Instalar dependências

```bash
cd frontend
npm install
```

### Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

A interface estará disponível em `http://localhost:5173`.

### Rodar os testes

```bash
npm test
```

### Lint

```bash
npm run lint
```

### Build de produção

```bash
npm run build
```

Os arquivos estáticos são gerados em `frontend/dist/`.

## Rodando tudo junto

Para rodar backend e frontend simultaneamente, abra dois terminais:

**Terminal 1 — Backend:**
```bash
cd backend && npm start
```

**Terminal 2 — Frontend:**
```bash
cd frontend && npm run dev
```

## Variáveis de ambiente

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `PORT` | `3000` | Porta do servidor backend |

Não há arquivo `.env` necessário para rodar localmente — todos os valores têm padrões definidos no código.

## Estrutura de portas

| Serviço | URL padrão |
|---------|-----------|
| Backend (API) | `http://localhost:3000` |
| Frontend (dev) | `http://localhost:5173` |

## Solução de problemas

**Porta já em uso:**
```bash
# Verificar qual processo está usando a porta 3000
lsof -i :3000        # macOS / Linux
netstat -ano | findstr :3000  # Windows
```

**Dependências desatualizadas ou corrompidas:**
```bash
# Apagar node_modules e reinstalar
rm -rf node_modules
npm install
```

**Erro de versão do Node.js:**  
Certifique-se de estar usando Node.js 20 ou superior. Recomenda-se usar o [nvm](https://github.com/nvm-sh/nvm) para gerenciar versões:

```bash
nvm install 20
nvm use 20
```
