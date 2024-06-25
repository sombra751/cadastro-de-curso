const {Router } = require('express')
const authController = require('../controllers/authController')

const router = Router()

router
.post('/auth/login', authController.login)


module.exports = router