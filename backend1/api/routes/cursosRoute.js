const { Router } = require('express')
const CursoController = require('../controllers/CursoController')

const router = Router()

router
    .get('/cursos', CursoController.pegarTodosOsCursos)
    .get('/cursos/:id', CursoController.pegaUmCurso)
    .post('/cursos', CursoController.criaUmCurso)
    .put('/cursos/:id', CursoController.atualizaUmCurso)
    .delete('/cursos/:id', CursoController.deletarUmCurso)

module.exports = router