const express = require('express')
const app = express()

app.use(express.json())

app.use('/auth', require('./routes/auth'))
app.use('/tarefas', require('./routes/tarefas'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`)
})