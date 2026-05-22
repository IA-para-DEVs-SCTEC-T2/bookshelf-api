# Instalação e execução — BookShelf API

## Pré-requisitos

- [Node.js 20 LTS](https://nodejs.org/) ou superior
- npm (incluído com o Node.js)
- Git

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

### Executar em desenvolvimento

```bash
npm start
```

O servidor sobe em `http://localhost:5000`.

### Documentação interativa (Swagger UI)

Com o servidor rodando, acesse:

```
http://localhost:5000/api-docs
```

### Rodar testes

```bash
npm test
```

### Rodar lint

```bash
npm run lint
```

### Verificar build

```bash
npm run build
```

## Frontend

### Instalar dependências

```bash
cd frontend
npm install
```

### Executar em desenvolvimento

```bash
npm run dev
```

O frontend sobe em `http://localhost:5173`.

### Rodar testes

```bash
npm test
```

### Rodar lint

```bash
npm run lint
```

### Gerar build de produção

```bash
npm run build
```

Os arquivos gerados ficam em `frontend/dist/`.

## Executar backend e frontend juntos

Abra dois terminais separados:

**Terminal 1 — Backend:**
```bash
cd backend
npm start
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

## Variáveis de ambiente

O projeto não requer variáveis de ambiente para rodar localmente. As portas padrão são:

| Serviço | Porta |
|---|---|
| Backend | 5000 |
| Frontend | 5173 |
| Swagger UI | 5000/api-docs |

## Pipeline CI/CD

O pipeline é executado automaticamente no GitHub Actions a cada `push` ou `pull_request` para a branch `main`. Consulte `.github/workflows/ci.yml` para detalhes.
