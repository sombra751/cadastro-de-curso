const {Router} = require('express')
const RespostaController = require('../controllers/RespostaController')

const router = Router()

router
    .get('/respostas', RespostaController.pegaTodasRespostas)
    .post('/respostas', RespostaController.criarResposta)
    .delete('/respostas/:id', RespostaController.deletaResposta)

module.exports = router