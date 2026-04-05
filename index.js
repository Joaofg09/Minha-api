const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.use('/auth', require('./routes/auth'))
app.use('/tarefas', require('./routes/tarefas'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`)
})

process.on('uncaughtException', (err) => {
  console.error('Erro não tratado:', err)
  process.exit(1)
})