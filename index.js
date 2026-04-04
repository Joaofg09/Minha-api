const express = require('express')
const app = express()

app.use(express.json())

app.use('/auth', require('./routes/auth'))
app.use('/tarefas', require('./routes/tarefas'))

app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000')
})