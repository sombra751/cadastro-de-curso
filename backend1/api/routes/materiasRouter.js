const {Router} = require('express')
const MateriaController = require('../controllers/MateriaController')

const router = Router()

router
    // .get('/materias', MateriaController.pegaTodasAsMaterias)
    // .get('/materias/:id', MateriaController.pegaUmaMateria)
    // .get('/materias/:materiaId/atividade/:atividadeId', MateriaController.pegaUmaAtividade)
    // .get('/materias/:materiaId/atividade', MateriaController.pegaTodasAtividades)
    // .get('/materias/:materiaId/atividade/:atividadeId/alternativa', MateriaController.pegaTodasAlternativas)
    // .post('/materias', MateriaController.criaUmaMateria)
    // .post('/materias/:materiaId/atividade', MateriaController.criarAtividade)
    // .put('/materias/:id', MateriaController.atualizaUmaMateria)
    // .delete('/materias/:id', MateriaController.deletaMateria)
    
    .put('/materias/:id', MateriaController.atualizaMateriaComAtividadesEAlternativas)
    .delete('/materias/:id', MateriaController.deletaMateriasComAtividadesEAlternativas)
    .get('/materias', MateriaController.pegaTodasMateriasComAtividadesEAlternativas)
    .get('/materias/:id', MateriaController.pegaUmaMateriasComAtividadesEAlternativas)
    .post('/materias', MateriaController.criaMateriaAtividadesAlternativas)


module.exports = router