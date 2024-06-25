const { Router } = require('express')
const AlunoController = require('../controllers/AlunoController')

const router = Router()

router
    .get('/alunos', AlunoController.pegaTodosOsAlunos)
    .get('/alunos/:id', AlunoController.pegaUmAluno)
    .get('/alunos/:estudanteId/matricula/:matriculaId', AlunoController.pegaUmMatricula)
    .get('/alunos/:estudanteId/matricula', AlunoController.pegaTodasMatricula)
    .get('/alunos/matricula/:cursoId/confirmadas', AlunoController.pegaMatriculasPorCurso)
    .get('/alunos/matricula/lotada', AlunoController.pegaCursosLotadas)
    .post('/alunos', AlunoController.criaUmaAluno)
    // .post('/alunos/:id/restaura', AlunoController.restauraPessoa)
    .post('/alunos/:estudanteId/matricula', AlunoController.criarMatricula)
    .post('/alunos/:estudanteId/cancela', AlunoController.cancelaPessoa)
    .put('/alunos/:id', AlunoController.atualizaUmAluno)
    .put('/alunos/:estudanteId/matricula/:matriculaId', AlunoController.atualizaMatricula)
    .delete('/alunos/:estudanteId/matricula/:matriculaId', AlunoController.deletaMatricula)
    .delete('/alunos/:id', AlunoController.deletaAluno)

module.exports = router