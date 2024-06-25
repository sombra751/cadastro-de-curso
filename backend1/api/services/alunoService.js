const database = require('../models')
const { hash } = require('bcryptjs')
const uuid = require('uuid')

class AlunoService {
    async cadastrar(dto) {
        const usuario = await database.Alunos.findOne({
            where: {
                email: dto.email
            }
        })

        if (usuario) {
            throw new Error('Usuário ja cadastrado')
        }
        try {
            const passwordHash = await hash(dto.password, 8)
            const novoUsuario = await database.Alunos.create({
                id: uuid.v4(),
                nome: dto.nome,
                password: passwordHash,
                email: dto.email,
                telefone: dto.telefone,
                cep:dto.cep,
                numero: dto.numero,
                complemento:dto.complemento,   
                rua: dto.rua,
                bairro: dto.bairro,
                cidade: dto.cidade,
                estado: dto.estado,
                curso_id: dto.curso_id
            })

            return novoUsuario
        } catch (error) {
            throw new Error('Erro ao cadastrar usuário')
        }
    }
}

module.exports = AlunoService