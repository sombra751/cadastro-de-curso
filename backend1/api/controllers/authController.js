const AuthService = require('../services/authService')

const authService = new AuthService()

class authController {
    static async login(req, res) {
        const {password, email} = req.body

        try {
            const login = await authService.login({password, email})
    
            res.status(200).send(login)
            
        } catch (error) {
            res.status(401).send({message: error.message})
        }
    }
}

module.exports = authController