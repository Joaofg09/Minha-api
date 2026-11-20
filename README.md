<h1 align="center">⚙️ Minha API — API REST de Tarefas</h1>

<p align="center">
  Back-end do <a href="https://github.com/Joaofg09/tarefas-app">Tarefas App</a>: cadastro, login com JWT e CRUD de tarefas.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express 5" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</p>

---

## 📌 Sobre o projeto

API REST desenvolvida com **Node.js + Express**, usando **Prisma ORM** sobre **PostgreSQL**. Ela forma o back-end de uma aplicação full-stack dividida em dois repositórios:

| Parte | Repositório |
|---|---|
| ⚙️ **Back-end** (este) | [Minha-api](https://github.com/Joaofg09/Minha-api) |
| 🖥️ **Front-end** | [tarefas-app](https://github.com/Joaofg09/tarefas-app) |

## ✨ Funcionalidades

- 📝 Cadastro de usuários com senha criptografada (**bcrypt**)
- 🔐 Login que devolve um **token JWT** válido por 7 dias
- 🛡️ Middleware `autenticar` que protege todas as rotas de tarefas
- ✅ CRUD completo de tarefas
- 🗃️ Banco versionado com **migrations do Prisma**
- 🌐 CORS habilitado para o front-end

## 🔗 Endpoints

### Autenticação

| Método | Rota | Corpo | Resposta |
|---|---|---|---|
| `POST` | `/auth/cadastro` | `{ email, senha }` | `201` com `{ id, email }` |
| `POST` | `/auth/login` | `{ email, senha }` | `200` com `{ token }` |

### Tarefas 🔒
Requer o cabeçalho `Authorization: Bearer <token>`.

| Método | Rota | Corpo | Descrição |
|---|---|---|---|
| `GET` | `/tarefas` | — | Lista as tarefas |
| `POST` | `/tarefas` | `{ nome }` | Cria uma tarefa |
| `PUT` | `/tarefas/:id` | `{ nome?, feita? }` | Atualiza uma tarefa |
| `DELETE` | `/tarefas/:id` | — | Remove uma tarefa (`204`) |

## 🗃️ Modelo de dados

```prisma
model Usuario {
  id    Int    @id @default(autoincrement())
  email String @unique
  senha String            // hash bcrypt
}

model Tarefa {
  id    Int     @id @default(autoincrement())
  nome  String
  feita Boolean @default(false)
}
```

## 📁 Estrutura

```
├── index.js              # Configuração do Express e das rotas
├── middleware/
│   └── autenticar.js     # Validação do token JWT
├── routes/
│   ├── auth.js           # /auth/cadastro e /auth/login
│   └── tarefas.js        # CRUD de /tarefas
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── docker-compose.yml    # PostgreSQL para desenvolvimento
└── Procfile / start.sh   # Deploy: aplica as migrations e sobe a API
```

## 🚀 Como rodar

### Pré-requisitos
- [Node.js](https://nodejs.org/) 20.6 ou superior
- PostgreSQL instalado **ou** [Docker](https://www.docker.com/)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/Joaofg09/Minha-api.git
cd Minha-api

# 2. Instale as dependências
npm install

# 3. (Opcional) Suba o PostgreSQL com Docker
docker compose up -d banco
```

Crie um arquivo `.env` na raiz:

```env
DATABASE_URL="postgresql://postgres:1234@localhost:5432/minhaapi"
JWT_SECRET="troque-por-uma-chave-secreta"
```

```bash
# 4. Rode as migrations
npx prisma migrate dev

# 5. Suba o servidor (carregando o .env)
node --env-file=.env index.js
```

A API fica disponível em **http://localhost:3000**.

### Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `DATABASE_URL` | String de conexão do PostgreSQL |
| `JWT_SECRET` | Chave usada para assinar e validar os tokens |
| `PORT` | Porta do servidor (padrão: `3000`) |

### Testando rápido com cURL

```bash
curl -X POST http://localhost:3000/auth/cadastro -H "Content-Type: application/json" -d '{"email":"teste@email.com","senha":"123456"}'
curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"email":"teste@email.com","senha":"123456"}'
# use o token retornado:
curl http://localhost:3000/tarefas -H "Authorization: Bearer SEU_TOKEN"
```

---

<p align="center">
  Feito por <a href="https://github.com/Joaofg09">João Pedro</a>
</p>
