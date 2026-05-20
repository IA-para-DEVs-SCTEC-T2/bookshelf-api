# 📦 Guia de Instalação - BookShelf API

Este documento descreve como preparar seu ambiente e executar a BookShelf API localmente.

---

## 1. Pré-requisitos

Antes de começar, certifique-se de que você possui os seguintes softwares instalados em sua máquina:

### Node.js e npm

A API foi desenvolvida com **Node.js** (versão 14 ou superior) e **npm** (Node Package Manager).

**Para verificar se está instalado:**

```bash
node --version
npm --version
```

Se não tiver Node.js instalado, [clique aqui para baixar](https://nodejs.org/).

### Git (Opcional)

Se deseja clonar o repositório, você precisará de **Git**. Caso contrário, pode fazer o download direto do projeto.

**Para verificar se está instalado:**

```bash
git --version
```

Se não tiver Git, [clique aqui para baixar](https://git-scm.com/).

### Editor de Código (Recomendado)

Use um editor como:
- [Visual Studio Code](https://code.visualstudio.com/) (recomendado)
- [Sublime Text](https://www.sublimetext.com/)
- [IntelliJ IDEA](https://www.jetbrains.com/idea/)

---

## 2. Como Clonar o Repositório

Se você tem Git instalado, clone o repositório usando:

```bash
git clone <url-do-repositorio> bookshelf-api
```

Substitua `<url-do-repositorio>` pela URL real do repositório.

### Alternativa: Baixar o arquivo ZIP

Se não quiser usar Git, você pode:
1. Ir para a página do repositório
2. Clicar em **Code**
3. Selecionar **Download ZIP**
4. Extrair o arquivo em uma pasta de sua escolha

---

## 3. Como Acessar a Pasta do Projeto

Após clonar ou extrair o projeto, abra o terminal/prompt de comando e navegue até a pasta do backend:

```bash
cd bookshelf-api/backend
```

Você deve ver o conteúdo da pasta com os arquivos como `package.json`, `src/`, `tests/`, etc.

---

## 4. Como Instalar Dependências

Na pasta `backend`, instale todas as dependências necessárias:

```bash
npm install
```

Este comando irá:
- Ler o arquivo `package.json`
- Baixar todos os pacotes listados em **dependencies** e **devDependencies**
- Criar a pasta `node_modules/` com os pacotes instalados

**Tempo esperado:** 1-3 minutos, dependendo da sua conexão de internet.

Você saberá que foi bem-sucedido quando ver a mensagem:
```
added X packages in Xs
```

---

## 5. Como Executar em Modo de Desenvolvimento

Para começar a trabalhar com a API em modo desenvolvimento:

```bash
npm start
```

Você verá a seguinte mensagem no terminal:

```
BookShelf API running on port 3000
```

Isso significa que a API está funcionando! 🎉

**A API está acessível em:**
```
http://localhost:3000
```

**Para parar a API**, pressione `Ctrl + C` no terminal.

---

## 6. Como Executar em Modo Padrão

Você também pode executar a API usando Node.js diretamente (sem usar o script npm):

```bash
node src/server.js
```

Resultado esperado:
```
BookShelf API running on port 3000
```

### Alterar a Porta (Opcional)

Se quiser executar em uma porta diferente, use a variável de ambiente `PORT`:

**No Windows (Command Prompt):**
```bash
set PORT=5000 && node src/server.js
```

**No Windows (PowerShell):**
```bash
$env:PORT = 5000; node src/server.js
```

**No macOS/Linux:**
```bash
PORT=5000 node src/server.js
```

---

## 7. Como Validar se a API Está Funcionando

### 7.1 Verificar o Health Check

Abra seu navegador ou use o comando `curl`:

```bash
curl -X GET http://localhost:3000/health
```

**Resposta esperada:**
```json
{
  "status": "ok",
  "service": "bookshelf-api"
}
```

### 7.2 Testar um Endpoint

Obtenha a lista de livros:

```bash
curl -X GET http://localhost:3000/books
```

**Resposta esperada:**
```json
[
  {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "category": "software",
    "status": "reading",
    "rating": 5,
    "createdAt": "2026-05-01T10:00:00.000Z"
  },
  ...
]
```

### 7.3 Usar Ferramentas Visuais

Você também pode usar ferramentas como:
- **Postman** ([Download](https://www.postman.com/downloads/))
- **Insomnia** ([Download](https://insomnia.rest/download))
- **Thunder Client** (Extensão do VS Code)

---

## 8. Problemas Comuns e Soluções

### ❌ "npm: command not found"

**Problema:** npm não está instalado ou não está no PATH.

**Solução:**
1. Instale Node.js do site oficial: https://nodejs.org/
2. Reinicie seu terminal/prompt de comando
3. Verifique: `npm --version`

---

### ❌ "EACCES: permission denied" (macOS/Linux)

**Problema:** Falta de permissão para instalar pacotes globalmente.

**Solução:**
Use `sudo` (com cautela):
```bash
sudo npm install
```

Ou configure npm para usar um diretório local:
```bash
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

---

### ❌ "Port 3000 is already in use"

**Problema:** Outra aplicação está usando a porta 3000.

**Soluções:**

**Opção 1: Executar em uma porta diferente**
```bash
PORT=3001 npm start
```

**Opção 2: Encerrar o processo que usa a porta 3000**

No Windows (Command Prompt):
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

No macOS/Linux:
```bash
lsof -ti:3000 | xargs kill -9
```

---

### ❌ "ENOENT: no such file or directory" ao executar `npm start`

**Problema:** `package.json` não foi encontrado.

**Solução:**
Certifique-se de que você está na pasta correta:
```bash
cd bookshelf-api/backend
ls  # macOS/Linux
dir  # Windows
```

Você deve ver `package.json` listado.

---

### ❌ "Cannot find module 'express'"

**Problema:** As dependências não foram instaladas.

**Solução:**
```bash
npm install
```

Certifique-se de estar na pasta `backend` e que não há erros de conexão.

---

### ❌ "node_modules folder is very large"

**Problema:** A pasta `node_modules/` ocupa muito espaço em disco.

**Solução:**
Você pode deletar `node_modules/` e reinstalar quando necessário:
```bash
rm -rf node_modules  # macOS/Linux
rmdir /s /q node_modules  # Windows
npm install  # Reinstalar
```

Isso é seguro porque `npm install` sempre recria a pasta baseado no `package.json`.

---

### ❌ "npm install está muito lento"

**Problema:** Conexão de internet lenta ou servidor npm sobrecarregado.

**Soluções:**

**Opção 1: Usar um mirror alternativo**
```bash
npm config set registry https://registry.npmmirror.com
npm install
```

**Opção 2: Limpar cache e tentar novamente**
```bash
npm cache clean --force
npm install
```

**Opção 3: Aumentar timeout**
```bash
npm config set fetch-timeout 120000
npm install
```

---

## ✅ Próximos Passos

Após instalar e executar a API com sucesso:

1. **Explore os endpoints** - Consulte o [README.md](../README.md) para ver todos os endpoints disponíveis
2. **Execute os testes** - Verifique se tudo está funcionando:
   ```bash
   npm test
   ```
3. **Valide o código** - Execute o linter:
   ```bash
   npm run lint
   ```
4. **Leia a documentação** - Consulte [ARCHITECTURE.md](./ARCHITECTURE.md) para entender a estrutura do projeto

---

## 📞 Precisa de Ajuda?

Se encontrar problemas não listados aqui:

1. Verifique se todas as etapas foram seguidas corretamente
2. Verifique a versão de Node.js: `node --version`
3. Tente reinstalar as dependências: `npm install`
4. Procure na documentação do projeto ou abra uma issue no repositório

---

**Última atualização:** Maio de 2026