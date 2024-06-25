const database = require('../models')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const jsonSecret = require('../config/jsonSecret')

class AuthService {
    async login(dto) {
        try {
            
            const usuario = await database.Admins.findOne({
                attributes: ['id', 'email', 'password'],
                where: {
                    email: dto.email
                }
            })
    
            if (!usuario) {
                throw new Error('Usuário não cadastrado')
            }
    
            const senhasIguais = await compare(dto.password, usuario.password)
    
            if (!senhasIguais) {
                throw new Error('Usuário ou senha invalido')
            }
    
            const accessToken = sign({ id: usuario.id, email: usuario.email }, jsonSecret.secret, { expiresIn: 20 })
    
            return { accessToken }
        } catch (error) {
            throw new Error(error)
        }
    }

}

module.exports = AuthService