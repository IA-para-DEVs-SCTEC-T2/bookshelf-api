# Guia de Instalação - BookShelf API

Este documento descreve como preparar seu ambiente e executar a BookShelf API localmente.

## 📋 Pré-requisitos

Antes de começar, certifique-se de que você possui os seguintes softwares instalados:

### Node.js e npm

A API requer **Node.js versão 14 ou superior** e **npm** (gerenciador de pacotes).

**Para verificar se você já tem instalado:**

```bash
node --version
npm --version
```

**Se não tiver instalado:**

- **Windows**: Baixe em [nodejs.org](https://nodejs.org/) e execute o instalador
- **macOS**: Use Homebrew:
  ```bash
  brew install node
  ```
- **Linux (Ubuntu/Debian)**: Use apt:
  ```bash
  sudo apt update
  sudo apt install nodejs npm
  ```

### Git (opcional, mas recomendado)

Para clonar o repositório, você precisará do Git.

**Para verificar se você já tem instalado:**

```bash
git --version
```

**Se não tiver instalado:**

- **Windows**: Baixe em [git-scm.com](https://git-scm.com/)
- **macOS**: Use Homebrew:
  ```bash
  brew install git
  ```
- **Linux (Ubuntu/Debian)**: Use apt:
  ```bash
  sudo apt install git
  ```

### Editor de Código (opcional)

Recomendamos usar um editor como:
- [Visual Studio Code](https://code.visualstudio.com/)
- [Sublime Text](https://www.sublimetext.com/)
- [WebStorm](https://www.jetbrains.com/webstorm/)

---

## 🔄 Como Clonar o Repositório

Se você ainda não tem o projeto em sua máquina, clone o repositório:

```bash
git clone https://github.com/seu-usuario/bookshelf-api.git
```

Se você receber um erro de permissão, verifique se tem acesso ao repositório ou use HTTPS em vez de SSH.

---

## 📂 Como Acessar a Pasta do Projeto

Após clonar (ou se já tiver o projeto), navegue até a pasta do backend:

```bash
cd bookshelf-api/backend
```

Você deve estar dentro da pasta `backend` para executar os próximos comandos.

**Para verificar se está no local correto:**

```bash
ls
```

Você deve ver arquivos como `package.json`, `src/`, `tests/`, etc.

---

## 📦 Como Instalar Dependências

Com o Node.js e npm instalados, instale as dependências do projeto:

```bash
npm install
```

Este comando lerá o arquivo `package.json` e instalará todas as dependências necessárias na pasta `node_modules/`.

**Tempo estimado:** 1-2 minutos (depende da sua conexão de internet)

**Após a instalação, você deve ver:**
- Uma pasta `node_modules/` criada
- Um arquivo `package-lock.json` atualizado

---

## 🚀 Como Executar em Modo de Desenvolvimento

Para executar a API em modo de desenvolvimento (com recarregamento automático):

```bash
npm start
```

**Você deve ver uma mensagem como:**

```
Servidor rodando em http://localhost:3000
```

A API estará disponível em `http://localhost:3000`.

**Para parar o servidor:**
- Pressione `Ctrl + C` no terminal

---

## ▶️ Como Executar em Modo Padrão

O modo padrão é o mesmo que o modo de desenvolvimento neste projeto. Execute:

```bash
npm start
```

Se você quiser apenas verificar se o código está correto sem iniciar o servidor:

```bash
npm run build
```

Este comando verifica a sintaxe dos arquivos sem executar a aplicação.

---

## ✅ Como Validar se a API Está Funcionando

Após iniciar o servidor com `npm start`, você pode validar se está funcionando de várias formas:

### Opção 1: Usar curl (linha de comando)

```bash
curl http://localhost:3000/health
```

**Resposta esperada:**

```json
{
  "status": "ok",
  "service": "bookshelf-api"
}
```

### Opção 2: Usar Postman ou Insomnia

1. Abra [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/)
2. Crie uma nova requisição GET
3. Digite a URL: `http://localhost:3000/health`
4. Clique em "Send"

### Opção 3: Usar o navegador

Abra seu navegador e acesse:

```
http://localhost:3000/health
```

Você deve ver a resposta JSON no navegador.

### Opção 4: Listar todos os livros

```bash
curl http://localhost:3000/books
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

---

## 🧪 Como Executar os Testes

Para garantir que tudo está funcionando corretamente, execute os testes automatizados:

```bash
npm test
```

**Você deve ver uma saída como:**

```
PASS  tests/books.test.js
  ✓ GET /health retorna status ok
  ✓ GET /books retorna lista de livros
  ✓ POST /books cria um novo livro
  ...

Test Suites: 1 passed, 1 total
Tests:       X passed, X total
```

Se todos os testes passarem, a API está funcionando corretamente.

---

## 🔍 Como Verificar a Qualidade do Código

Para verificar se o código segue os padrões de qualidade:

```bash
npm run lint
```

Se não houver erros, você verá uma mensagem de sucesso. Se houver problemas, eles serão listados com sugestões de correção.

---

## ⚠️ Problemas Comuns e Soluções

### Problema 1: "command not found: node"

**Causa:** Node.js não está instalado ou não está no PATH do sistema.

**Solução:**
1. Verifique se Node.js está instalado: `node --version`
2. Se não estiver, instale em [nodejs.org](https://nodejs.org/)
3. Reinicie seu terminal após a instalação

---

### Problema 2: "npm: command not found"

**Causa:** npm não está instalado ou não está no PATH do sistema.

**Solução:**
1. Verifique se npm está instalado: `npm --version`
2. npm geralmente vem com Node.js, então reinstale Node.js
3. Reinicie seu terminal após a instalação

---

### Problema 3: "EACCES: permission denied"

**Causa:** Falta de permissão para instalar pacotes globalmente.

**Solução (macOS/Linux):**

```bash
sudo npm install -g npm
```

Ou use um gerenciador de versões como [nvm](https://github.com/nvm-sh/nvm):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install node
```

---

### Problema 4: "Port 3000 is already in use"

**Causa:** Outra aplicação está usando a porta 3000.

**Solução:**

**Opção A: Parar a aplicação que está usando a porta**

- Identifique qual processo está usando a porta 3000
- Feche a aplicação ou o terminal que está rodando

**Opção B: Usar uma porta diferente**

Modifique o arquivo `src/server.js` e altere a porta:

```javascript
const PORT = 5000; // Mude de 3000 para 5000
```

Depois reinicie o servidor:

```bash
npm start
```

---

### Problema 5: "Cannot find module 'express'"

**Causa:** As dependências não foram instaladas.

**Solução:**

```bash
npm install
```

Certifique-se de estar na pasta `backend` do projeto.

---

### Problema 6: Testes falhando

**Causa:** Dependências de desenvolvimento não foram instaladas.

**Solução:**

```bash
npm install
npm test
```

Se o problema persistir, tente limpar o cache:

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm test
```

---

### Problema 7: "ENOENT: no such file or directory"

**Causa:** Você não está na pasta correta do projeto.

**Solução:**

Verifique se está na pasta `backend`:

```bash
pwd  # macOS/Linux
cd   # Windows
```

Você deve estar em uma pasta que contém `package.json`. Se não estiver, navegue até lá:

```bash
cd caminho/para/bookshelf-api/backend
```

---

## 📚 Próximos Passos

Após instalar e validar que a API está funcionando:

1. **Leia o README.md** para entender os endpoints disponíveis
2. **Explore os endpoints** usando curl, Postman ou seu navegador
3. **Consulte a documentação OpenAPI** em `openapi.yaml`
4. **Estude o código** em `src/app.js` para entender como funciona
5. **Execute os testes** para aprender sobre o comportamento esperado

---

## 🆘 Precisa de Ajuda?

Se encontrar problemas não listados aqui:

1. Verifique se todas as versões estão corretas:
   ```bash
   node --version
   npm --version
   ```

2. Tente limpar o cache e reinstalar:
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Consulte a documentação oficial:
   - [Node.js Docs](https://nodejs.org/docs/)
   - [npm Docs](https://docs.npmjs.com/)
   - [Express Docs](https://expressjs.com/)

---

**Última atualização:** Maio de 2026
