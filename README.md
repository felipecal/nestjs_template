# NestJS Template

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Descrição

Este é um template robusto para acelerar o desenvolvimento de projetos utilizando **NestJS**. O objetivo é fornecer uma fundação sólida com as melhores práticas, bibliotecas essenciais já configuradas e uma arquitetura escalar.

## ⚠️ Configuração Inicial (Importante!)

Antes de começar a desenvolver sua feature, lembre-se de renomear o projeto nos seguintes arquivos para refletir o nome da sua aplicação:

1. **`package.json`**: Altere o campo `"name"` para o nome do seu projeto.
2. **`src/main.ts`**: Atualize as configurações do Swagger (`setTitle`, `setDescription`, `addTag`).
3. **`docker-compose.yml`**: Atualize os nomes dos serviços e containers para evitar conflitos com outros projetos.

## ✨ Funcionalidades Principais

- **Autenticação & Autorização**:
  - Login e Registro seguros.
  - **JWT Access Tokens** (Curta duração) & **Refresh Tokens** (Longa duração, rotacionáveis).
  - Armazenamento seguro via **HTTP-only cookies**.
  - Hashing de senha com Bcrypt.
  - Estratégias do Passport configuradas.
- **Gerenciamento de Usuários**:
  - Operações CRUD para usuários.
  - Proteção contra e-mail duplicado com tratamento automático de conflitos.
- **Arquitetura**:
  - **Repository Pattern**: Desacopla estritamente a lógica de domínio da implementação do banco de dados (Inversão de Dependência).
  - **Filtro Global de Exceções**: Tratamento centralizado de erros que mapeia automaticamente erros de banco de dados (como constraints únicas) para respostas HTTP amigáveis (ex: 409 Conflict).
- **Segurança**:
  - `helmet` para headers de segurança.
  - Configuração de CORS (Permite credenciais e origem via variáveis de ambiente).
  - Rate Limiting (Throttler).
- **Documentação**:
  - Documentação automatizada via **Swagger** (OpenAPI).

## 🛠️ Tecnologias

- **Framework**: [NestJS](https://nestjs.com/) (Node.js)
- **Linguagem**: TypeScript
- **Banco de Dados**: PostgreSQL
- **ORM**: [Sequelize](https://sequelize.org/) (com `sequelize-typescript`)
- **Containerização**: Docker & Docker Compose
- **Validação**: `class-validator` & `class-transformer`
- **Documentação**: Swagger (OpenAPI)

## ✅ Pré-requisitos

- **Docker** e **Docker Compose** para rodar o banco de dados facilmente.
- **Node.js**: Versão **24.11.0** conforme especificado no arquivo `.nvmrc`. Recomenda-se o uso do `nvm`.

## 🚀 Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://seu-repositorio.git
    cd nome-do-projeto
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configuração de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto (copie do `.env_example` se disponível) e configure as variáveis:

    ```env
    PORT=3000
    FRONTEND_URL=http://localhost:5173

    # Database
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=postgres
    DB_DATABASE=financial_db
    DB_DIALECT=postgres

    # Auth
    JWT_SECRET=super-secret-key
    JWT_EXPIRES_IN=15m
    REFRESH_SECRET=super-secret-refresh-key
    REFRESH_EXPIRES_IN=7d
    REFRESH_TOKEN_ROTATION_KEEPS_EXPIRATION=true
    ```

## ▶️ Executando a Aplicação

1.  **Suba o Banco de Dados (Docker):**

    ```bash
    docker-compose up -d
    ```

2.  **Execute as Migrations:**

    ```bash
    npx sequelize-cli db:migrate
    ```

3.  **Inicie o Servidor:**

    ```bash
    # desenvolvimento
    npm run start:dev

    # modo produção
    npm run start:prod
    ```

## 📚 Documentação da API

A aplicação é documentada usando **Swagger**. Uma vez que a aplicação esteja rodando, verifique os endpoints em:

- **Swagger UI**: [http://localhost:3000/docs](http://localhost:3000/docs)
- **JSON Spec**: [http://localhost:3000/docs-json](http://localhost:3000/docs-json)

## 📂 Estrutura do Projeto

```
src/
├── auth/                 # Módulo de Autenticação (Login, Register, Refresh Token)
│   ├── domain/           # Entidades de Domínio & Interfaces
│   ├── guards/           # Guards de Auth (Local, JWT, Refresh)
│   ├── mappers/          # Mappers (Domínio <-> ORM)
│   ├── strategies/       # Estratégias do Passport
│   └── ...
├── users/                # Módulo de Usuários
│   ├── domain/           # Entidades de Domínio & Interfaces
│   ├── models/           # Models do Sequelize
│   └── ...
├── database/             # Configuração do Banco de Dados & Providers
├── common/               # Lógica Compartilhada (Filtros, Decorators, Utils)
│   └── filters/          # Filtros Globais de Exceção (ex: AllExceptionsFilter)
├── main.ts               # Ponto de Entrada da Aplicação
└── app.module.ts         # Módulo Raiz
```

<p align="center">
  Made with 💜 by <a href="https://github.com/felipecal" target="_blank">Felipe Caldas</a>
</p>
