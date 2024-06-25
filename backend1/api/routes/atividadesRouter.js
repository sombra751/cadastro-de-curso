const {Router} = require('express')
const AtividadeController = require('../controllers/AtividadeController')

const router = Router()

router
.get('/atividades', AtividadeController.pegaAtividadeAleatoria )
.get('/atividades/respostas', AtividadeController.comparaAtividadesComRespostas)

module.exports = router