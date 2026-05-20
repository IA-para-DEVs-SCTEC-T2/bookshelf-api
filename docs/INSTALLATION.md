# Guia de Instalação — Bookshelf API

---

## 1. Pré-requisitos

| Ferramenta | Versão mínima | Como verificar |
|---|---|---|
| [Node.js](https://nodejs.org/) | 18.x | `node -v` |
| [npm](https://www.npmjs.com/) | 9.x (incluído com Node 18) | `npm -v` |
| [Git](https://git-scm.com/) | qualquer versão recente | `git --version` |

> O projeto não usa Docker, banco de dados externo nem gerenciador de pacotes alternativo (yarn/pnpm).

---

## 2. Clonando o repositório

```bash
git clone https://github.com/seu-usuario/bookshelf-api.git
cd bookshelf-api
```

---

## 3. Instalando dependências

Acesse a pasta `backend` — todos os comandos a seguir devem ser executados a partir dela:

```bash
cd backend
npm install
```

O npm vai instalar as dependências de produção e de desenvolvimento listadas no `package.json`:

- **Produção:** `express`, `cors`, `swagger-ui-express`, `yamljs`
- **Desenvolvimento:** `jest`, `supertest`, `eslint`

---

## 4. Configurando variáveis de ambiente

O projeto não possui arquivo `.env.example`. A única variável lida pelo código é:

| Variável | Descrição | Valor padrão |
|---|---|---|
| `PORT` | Porta em que o servidor HTTP vai escutar | `3000` |

Se quiser usar uma porta diferente, crie um arquivo `.env` dentro da pasta `backend`:

```bash
# backend/.env
PORT=3000
```

Se o arquivo não existir, a API sobe normalmente na porta `3000`.

---

## 5. Executando a aplicação

Todos os scripts abaixo devem ser executados dentro da pasta `backend`.

| Comando | Script interno | Descrição |
|---|---|---|
| `npm start` | `node src/server.js` | Inicia o servidor em modo padrão |
| `npm test` | `jest` | Executa os testes automatizados com Jest |
| `npm run build` | `node -c src/app.js && node -c src/server.js` | Valida a sintaxe dos arquivos JS sem executar |
| `npm run lint` | `eslint src tests` | Analisa o código com ESLint |

**Para desenvolvimento local, use:**

```bash
npm start
```

Saída esperada no terminal:

```
BookShelf API running on port 3000
```

**Para reinicialização automática ao salvar arquivos** (o projeto não inclui `nodemon` por padrão), instale globalmente e execute:

```bash
npm install -g nodemon
nodemon src/server.js
```

---

## 6. Verificando se está funcionando

Com o servidor em execução, abra outro terminal e execute:

```bash
curl http://localhost:3000/health
```

Resposta esperada (`200 OK`):

```json
{
  "status": "ok",
  "service": "bookshelf-api"
}
```

Você também pode acessar pelo navegador:

- **Health check:** http://localhost:3000/health
- **Lista de livros:** http://localhost:3000/books
- **Documentação Swagger:** http://localhost:3000/docs

---

## 7. Solução de problemas comuns

### Porta 3000 já está em uso

**Sintoma:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Causa:** outro processo está ocupando a porta 3000.

**Solução:** defina uma porta diferente antes de iniciar:

```bash
# Linux / macOS
PORT=3001 npm start

# Windows CMD
set PORT=3001 && npm start
```

---

### Módulo não encontrado

**Sintoma:**
```
Error: Cannot find module 'express'
```

**Causa:** as dependências não foram instaladas ou a pasta `node_modules` foi removida.

**Solução:** execute `npm install` dentro da pasta `backend`:

```bash
npm install
```

---

### Versão incompatível do Node.js

**Sintoma:** erros de sintaxe inesperados ou comportamento incorreto ao iniciar o servidor.

**Causa:** versão do Node.js abaixo da 18.x instalada na máquina.

**Solução:** verifique a versão atual e atualize se necessário:

```bash
node -v
```

Baixe a versão LTS mais recente em https://nodejs.org/ ou use um gerenciador de versões como o [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm install 18
nvm use 18
```
