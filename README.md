# API de Tarefas

API REST desenvolvida com Node.js, Express e Prisma ORM, conectada a um banco de dados PostgreSQL.

## Tecnologias

- Node.js
- Express
- Prisma ORM
- PostgreSQL

## Como rodar localmente

### Pré-requisitos
- Node.js instalado
- PostgreSQL instalado e rodando

### Instalação

1. Clone o repositório:
   git clone https://github.com/Joaofg09/Minha-api.git
   cd Minha-api

2. Instale as dependências:
   npm install

3. Configure o banco de dados.
   Crie um arquivo .env na raiz com:
   DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/minhaapi"

4. Rode as migrations:
   npx prisma migrate dev

5. Suba o servidor:
   node index.js

A API estará disponível em http://localhost:3000

## Endpoints

| Método | Rota          | Descrição              |
|--------|---------------|------------------------|
| GET    | /tarefas      | Lista todas as tarefas |
| POST   | /tarefas      | Cria uma nova tarefa   |
| PUT    | /tarefas/:id  | Atualiza uma tarefa    |
| DELETE | /tarefas/:id  | Remove uma tarefa      |