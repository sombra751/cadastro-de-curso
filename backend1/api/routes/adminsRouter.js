const {Router} = require('express')
const AdminController = require('../controllers/AdminController')

const router = Router()

router
    .get('/admins', AdminController.pegaTodosOsAdmins)
    .get('/admins/:id', AdminController.pegaUmAdmin)
    .post('/admins', AdminController.cadastrar)
    .put('/admins/:id', AdminController.atualizaUmAdmin)
    .delete('/admins/:id', AdminController.deletaAdmin)

module.exports = router