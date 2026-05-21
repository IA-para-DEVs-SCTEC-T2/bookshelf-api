# Guia de Instalação

## Pré-requisitos

- [Node.js](https://nodejs.org/) versão 18 ou superior
- npm (já incluso com o Node.js)
- Git

Para verificar se já estão instalados:

```bash
node --version
npm --version
git --version
```

## Como clonar o repositório

```bash
git clone <url-do-repositorio>
```

## Como acessar a pasta do projeto

```bash
cd bookshelf-api/backend
```

## Como instalar dependências

```bash
npm install
```

## Como executar em modo de desenvolvimento

```bash
npm run dev
```

O servidor será iniciado em `http://localhost:5000` com reinício automático a cada alteração nos arquivos.

## Como executar em modo padrão

```bash
npm start
```

O servidor será iniciado em `http://localhost:5000`.

## Como validar se a API está funcionando

Abra outro terminal e execute:

```bash
curl http://localhost:5000/health
```

Resposta esperada:

```json
{
  "status": "ok",
  "service": "bookshelf-api"
}
```

## Problemas comuns e possíveis soluções

| Problema | Causa provável | Solução |
|----------|---------------|---------|
| `command not found: node` | Node.js não instalado | Instale o Node.js pelo site oficial |
| `EADDRINUSE: address already in use :::5000` | Porta 5000 já está em uso | Encerre o processo que ocupa a porta ou altere a porta no código |
| `MODULE_NOT_FOUND` | Dependências não instaladas | Execute `npm install` na pasta backend |
| `ECONNREFUSED` ao testar com curl | Servidor não está rodando | Inicie o servidor com `npm start` |
