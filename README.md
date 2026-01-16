<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# NestJS Template

Este é um template robusto para acelerar o desenvolvimento de projetos utilizando NestJS. O objetivo é fornecer uma fundação sólida com as melhores práticas e bibliotecas essenciais já configuradas.

## 🚀 Funcionalidades Incluídas

O projeto já vem configurado com:

- **Core**: NestJS v11 (TypeScript)
- **Banco de Dados**: PostgreSQL com Sequelize (via `sequelize-typescript`)
- **Autenticação**:
  - JWT Access Token & Refresh Token
  - Armazenamento seguro via HTTP-Only Cookies
  - Estratégias do Passport configuradas
- **Segurança**:
  - `helmet` para headers de segurança
  - `cors` configurado (Permite credenciais e origem via variáveis de ambiente)
  - Rate limiting com `@nestjs/throttler`
- **Documentação**: Swagger (OpenAPI) pré-configurado e acessível em `/docs`
- **Validação**: Global ValidationPipe com `class-validator` e `class-transformer`
- **Infraestrutura**: Docker e Docker Compose configurados para API e Banco de Dados

## ⚠️ Configuração Inicial (Importante!)

Antes de começar a desenvolver sua feature, lembre-se de renomear o projeto nos seguintes arquivos para refletir o nome da sua aplicação:

1. **`package.json`**: Altere o campo `"name"` para o nome do seu projeto.
2. **`src/main.ts`**: Atualize as configurações do Swagger (`setTitle`, `setDescription`, `addTag`).
3. **`docker-compose.yml`**: Atualize os nomes dos serviços e containers para evitar conflitos com outros projetos.

## � Pré-requisitos

- **Node.js**: Versão 24.11.0 ou superior (Recomendamos o uso do `nvm` e o arquivo `.nvmrc` incluído)
- **Docker** e **Docker Compose**

## �🛠️ Instalação

```bash
$ npm install
```

## ▶️ Executando a aplicação

```bash
# desenvolvimento
$ npm run start

# modo watch (desenvolvimento com reload automático)
$ npm run start:dev

# modo produção
$ npm run start:prod
```

## 🧪 Testes

```bash
# testes unitários
$ npm run test

# testes e2e
$ npm run test:e2e

# cobertura de testes
$ npm run test:cov
```

## 🐳 Docker

Para subir todo o ambiente (API + Banco de Dados) utilizando Docker Compose:

```bash
$ docker-compose up --build
```
