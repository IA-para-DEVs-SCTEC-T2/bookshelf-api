# Guia de Instalação — BookShelf API

Este guia explica como preparar o ambiente e executar o backend da BookShelf API localmente, do zero.

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado na sua máquina:

| Ferramenta | Versão mínima recomendada | Como verificar |
|---|---|---|
| [Node.js](https://nodejs.org/) | 18.x ou superior | `node --version` |
| [npm](https://www.npmjs.com/) | 9.x ou superior (já vem com o Node.js) | `npm --version` |
| [Git](https://git-scm.com/) | Qualquer versão recente | `git --version` |

Se algum desses comandos retornar erro, o programa correspondente não está instalado ou não está no PATH do sistema.

---

## Clonando o repositório

Abra o terminal e execute:

```bash
git clone <url-do-repositorio>
```

Substitua `<url-do-repositorio>` pela URL real do projeto (disponível no GitHub ou na plataforma onde o projeto está hospedado).

---

## Acessando a pasta do projeto

O projeto é um monorepo com pastas separadas para backend e frontend. Todos os comandos a seguir devem ser executados **dentro da pasta `backend/`**.

```bash
cd bookshelf-api/backend
```

> Se você já estiver dentro da pasta raiz do projeto, basta executar `cd backend`.

---

## Instalando as dependências

Com o terminal dentro de `backend/`, instale as dependências do projeto:

```bash
npm install
```

Isso criará a pasta `node_modules/` com todos os pacotes necessários para rodar a API.

---

## Executando a API

### Modo padrão

Para iniciar o servidor normalmente:

```bash
npm start
```

### Modo de desenvolvimento (execução direta)

Se quiser executar o servidor diretamente com o Node.js, sem passar pelo script do `package.json`:

```bash
node src/server.js
```

Em ambos os casos, você verá a seguinte mensagem no terminal quando a API estiver pronta:

```
BookShelf API running on port 3000
```

> A API ficará disponível em: **http://localhost:3000**

---

## Validando se a API está funcionando

Com o servidor em execução, abra outro terminal ou use uma ferramenta como o navegador, Insomnia ou Postman e faça uma requisição para o endpoint de health check:

```http
GET http://localhost:3000/health
```

**Resposta esperada (200 OK):**

```json
{
  "status": "ok",
  "service": "bookshelf-api"
}
```

Se você receber essa resposta, a API está funcionando corretamente.

---

## Rodando os testes

Para executar a suíte de testes automatizados (Jest + Supertest):

```bash
npm test
```

O resultado será exibido no terminal, indicando quais testes passaram ou falharam.

---

## Rodando o linter

Para verificar se o código segue os padrões de estilo definidos pelo ESLint:

```bash
npm run lint
```

Se não houver problemas, o comando termina sem exibir nenhuma mensagem. Caso existam erros ou avisos, eles serão listados com o arquivo e a linha correspondente.

---

## Verificando a sintaxe dos arquivos (build)

Para checar se os arquivos principais possuem erros de sintaxe:

```bash
npm run build
```

Este comando valida a sintaxe de `src/app.js` e `src/server.js` sem iniciar o servidor.

---

## Problemas comuns e possíveis soluções

### `node: command not found` ou `npm: command not found`

O Node.js não está instalado ou não foi adicionado ao PATH do sistema.

**Solução:** Baixe e instale o Node.js em [https://nodejs.org/](https://nodejs.org/). Após a instalação, feche e reabra o terminal.

---

### `Error: Cannot find module 'express'`

As dependências não foram instaladas.

**Solução:** Execute `npm install` dentro da pasta `backend/`.

---

### `Error: listen EADDRINUSE: address already in use :::3000`

A porta 3000 já está sendo usada por outro processo.

**Solução:** Encerre o processo que está usando a porta ou inicie a API em outra porta:

```bash
PORT=3001 npm start
```

A API ficará disponível em `http://localhost:3001`.

---

### `npm test` falha com erro de módulo não encontrado

As dependências de desenvolvimento não foram instaladas.

**Solução:** Certifique-se de ter rodado `npm install` (sem a flag `--production`) dentro da pasta `backend/`.

---

### O terminal não reconhece o comando após `cd backend`

Você pode estar no diretório errado.

**Solução:** Verifique em qual pasta você está com `pwd` (Linux/macOS) ou `cd` (Windows) e navegue até a pasta correta antes de executar qualquer comando.
