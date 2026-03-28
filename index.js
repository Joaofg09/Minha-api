const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

// GET /tarefas → lista todas
app.get('/tarefas', async (req, res) => {
  const tarefas = await prisma.tarefa.findMany()
  res.status(200).json(tarefas)
})

// POST /tarefas → cria nova
app.post('/tarefas', async (req, res) => {
  const tarefa = await prisma.tarefa.create({
    data: { nome: req.body.nome }
  })
  res.status(201).json(tarefa)
})

// PUT /tarefas/:id → atualiza
app.put('/tarefas/:id', async (req, res) => {
  const id = Number(req.params.id)
  const tarefa = await prisma.tarefa.update({
    where: { id },
    data: {
      nome: req.body.nome,
      feita: req.body.feita,
    }
  })
  res.status(200).json(tarefa)
})

// DELETE /tarefas/:id → remove
app.delete('/tarefas/:id', async (req, res) => {
  const id = Number(req.params.id)
  await prisma.tarefa.delete({ where: { id } })
  res.status(204).send()
})

app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000')
})