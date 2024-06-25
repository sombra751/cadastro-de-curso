const express = require('express')
const routes = require('./routes')
const session = require('express-session')
const { Session } = require('inspector')

const app = express()

app.use(session({ secret: 'joao', resave: false, saveUninitialized: true }));

// Configuração da secret key para JWT
const secretKey = 'sua_chave_secreta'; // Substitua por uma chave segura

// Middleware para verificar token em rotas protegidas
function verificaToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'Acesso proibido.' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao autenticar o token.' });
    }
    req.userId = decoded.id;
    next();
  });
}


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const port = 3200

routes(app)

app.listen(port, () => console.log(`servidor rodando na porta ${port}`))

module.exports = app