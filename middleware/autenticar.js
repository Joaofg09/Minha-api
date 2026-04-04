const jwt = require('jsonwebtoken')

function autenticar(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // pega o token depois de "Bearer "

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.usuarioId = payload.id // injeta o id do usuário na requisição
    next() // libera o acesso
  } catch {
    res.status(401).json({ erro: 'Token inválido ou expirado' })
  }
}

module.exports = autenticar