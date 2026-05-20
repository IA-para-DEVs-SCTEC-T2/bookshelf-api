# Guia de Instalação — Bookshelf API

Este guia descreve passo a passo como configurar e executar o projeto `bookshelf-api` localmente.

---

## Requisitos

| Ferramenta | Versão mínima |
|---|---|
| Node.js | 18.x |
| npm | 9.x |
| Git | qualquer versão recente |

### Verificar versões instaladas

```bash
node --version   # deve retornar v18.x.x ou superior
npm --version    # deve retornar 9.x.x ou superior
git --version
```

Se Node.js não estiver instalado, recomendamos usar o [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm install 18
nvm use 18
```

---

## Passo a passo

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd bookshelf-api
```

### 2. Instalar dependências do backend

```bash
cd backend
npm install
```

Dependências instaladas:
- `express` — framework HTTP
- `cors` — middleware de CORS
- `jest` + `supertest` — testes (devDependencies)
- `eslint` — linting (devDependencies)

### 3. Instalar dependências do frontend

```bash
cd ../frontend
npm install
```

Dependências instaladas:
- `react` + `react-dom` — framework UI
- `vite` — build tool e dev server
- `vitest` + `@testing-library/react` — testes (devDependencies)

---

## Configuração de Ambiente

O backend não requer arquivo `.env`. A única variável de ambiente suportada é `PORT`, que é opcional.

| Variável | Obrigatória | Padrão | Descrição |
|---|---|---|---|
| `PORT` | Não | `3000` | Porta em que o servidor HTTP escuta |

Para definir a porta ao iniciar:

```bash
PORT=8080 npm start
```

Veja [environment.md](environment.md) para detalhes completos.

---

## Iniciando os serviços

### Backend

```bash
cd backend
npm start
```

Saída esperada:

```
Bookshelf API running on port 3000
```

### Frontend (opcional)

```bash
cd frontend
npm run dev
```

Saída esperada:

```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

---

## Validando a instalação

Com o backend rodando, execute:

```bash
curl http://localhost:3000/health
```

Resposta esperada:

```json
{ "status": "ok", "service": "bookshelf-api" }
```

Para listar os livros de exemplo:

```bash
curl http://localhost:3000/books
```

---

## Rodando os testes

### Backend

```bash
cd backend
npm test
```

Saída esperada: 3 testes passando.

### Frontend

```bash
cd frontend
npm test
```

---

## Troubleshooting

### Porta 3000 já está em uso

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solução**: Use outra porta ou encerre o processo que está usando a 3000.

```bash
# Identificar o processo na porta 3000
lsof -i :3000

# Matar o processo (substitua PID pelo número encontrado)
kill -9 <PID>

# Ou simplesmente usar outra porta
PORT=3001 npm start
```

---

### node_modules com problema / dependências corrompidas

```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install
```

---

### Versão do Node.js incompatível

Se encontrar erros de sintaxe inesperados, verifique se está usando Node.js 18+:

```bash
node --version
```

Com nvm:

```bash
nvm use 18
```

---

### Erro de CORS ao acessar o frontend

O backend já tem CORS habilitado para todas as origens (`cors()`). Se houver erros de CORS, verifique:

1. Se o backend está rodando (`curl http://localhost:3000/health`)
2. Se o frontend está apontando para o endereço correto do backend

---

## Estrutura de portas padrão

| Serviço | Porta padrão |
|---|---|
| Backend (API) | 3000 |
| Frontend (dev server) | 5173 |
