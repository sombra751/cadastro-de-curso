const { Router } = require('express')
const DocenteController = require('../controllers/DocenteController')

const router = Router()

router
    .get('/docentes', DocenteController.listarDocentes)
    .get('/docentes/:id', DocenteController.pegaDocente)
    .post('/docentes', DocenteController.criaDocente)
    .put('/docentes/:id', DocenteController.atualizaDocente)
    .delete('/docentes/:id', DocenteController.deletarDocente)

module.exports = router