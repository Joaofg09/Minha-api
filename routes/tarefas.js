const express = require('express')
const { PrismaClient } = require('@prisma/client')
const autenticar = require('../middleware/autenticar')

const router = express.Router()
const prisma = new PrismaClient()

router.use(autenticar) // protege todas as rotas abaixo

router.get('/', async (req, res) => {
  const tarefas = await prisma.tarefa.findMany()
  res.status(200).json(tarefas)
})

router.post('/', async (req, res) => {
  const tarefa = await prisma.tarefa.create({
    data: { nome: req.body.nome }
  })
  res.status(201).json(tarefa)
})

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const tarefa = await prisma.tarefa.update({
    where: { id },
    data: { nome: req.body.nome, feita: req.body.feita }
  })
  res.status(200).json(tarefa)
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  await prisma.tarefa.delete({ where: { id } })
  res.status(204).send()
})

module.exports = router