const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')

const router = express.Router()
const prisma = new PrismaClient()

// POST /cadastro
router.post('/cadastro', async (req, res) => {
  const { email, senha } = req.body

  const existe = await prisma.usuario.findUnique({ where: { email } })
  if (existe) {
    return res.status(400).json({ erro: 'Email já cadastrado' })
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10)

  const usuario = await prisma.usuario.create({
    data: { email, senha: senhaCriptografada }
  })

  res.status(201).json({ id: usuario.id, email: usuario.email })
})

// POST /login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body

  const usuario = await prisma.usuario.findUnique({ where: { email } })
  if (!usuario) {
    return res.status(401).json({ erro: 'Email ou senha inválidos' })
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
  if (!senhaCorreta) {
    return res.status(401).json({ erro: 'Email ou senha inválidos' })
  }

  const token = jwt.sign(
    { id: usuario.id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  res.status(200).json({ token })
})

module.exports = router