const database = require('../models')

const AlunosServices = require('../services/alunoService')
const adminService = new AlunosServices()


class AlunoController {
    static async pegaTodosOsAlunos(req, res) {
        try {
            const todosOsAlunos = await database.Alunos.findAll()
            return res.status(200).json(todosOsAlunos)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmAluno(req, res) {
        const { id } = req.params
        try {
            const umAluno = await database.Alunos.findOne({where: {id: Number(id)}})
            return res.status(200).json(umAluno)
        } catch (error) {
            return res.status(200).json(error.message)
        }
    }
    static async criaUmaAluno(req,res) {
        const novoAluno = req.body
        try {
            // const novoAlunoCriado = await adminService.cadastrar(nome, password, email, telefone, cep, numero, complemento, rua, bairro, cidade, estado, curso_id)
            const novoAlunoCriado = await database.Alunos.create(novoAluno)
            return res.status(200).json(novoAlunoCriado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaUmAluno (req, res) {
        const novaInfo = req.body
        const { id } = req.params
        try {
            await database.Alunos.update(novaInfo, {where: {id: Number(id)}})
            const alunoAtualizado = await database.Alunos.findOne({where: {id: Number(id)}})
            return res.status(200).json(alunoAtualizado)
        } catch (error) {
            return res.status(500).json(error.message)
            
        }
    }

    static async deletaAluno(req, res) {
        const { id } = req.params
        try {
            await database.Alunos.destroy({where: {id: Number(id)}})
            return res.status(200).json({mensagem: `Aluno, id: ${id} foi deletado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //http://localhost:3000/pessoas/:1/matriculas/:2
    //http://localhost:3000/pessoas/:estudanteId/matriculas/:matriculaId
    static async pegaUmMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            const umaMatricula = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            return res.status(200).json(umaMatricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }

    }
    
    static async pegaTodasMatricula(req, res) {
        const { estudanteId } = req.params
        try {
            const aluno = await database.Alunos.findOne({ where: { id: Number(estudanteId) } })
            const matriculas = await aluno.getAulasMatriculadas()
            return res.status(200).json(matriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaMatriculasPorCurso(req, res) {
        const { cursoId } = req.params
        try {
            const todasAsMatriculas = await database.Matriculas.findAndCountAll({
                where: {
                    curso_id: Number(cursoId),
                    status: 'confirmado'
                },
                limit: 20,
                order: [['estudante_id', 'DESC']]
            })
            return res.status(200).json(todasAsMatriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaCursosLotadas(req, res) {
        const lotacaoTurma = 1
        try {
            const cursosLotadas = await database.Matriculas.findAndCountAll({
                where: {
                    status: 'confirmado'
                },
                attributes: ['curso_id'],
                group: ['curso_id'],
                having: Sequelize.literal(`count(curso_id) >= ${lotacaoTurma}`)
            })
            return res.status(200).json(cursosLotadas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async cancelaPessoa(req, res) {
        const { estudanteId } = req.params
        try {
            await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId))
            return res.status(200).json({ message: `Matriculas ref.estudante ${estudanteId} cancelado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criarMatricula(req, res) {
        const { estudanteId } = req.params
        const novaMatricula = { ...req.body, estudanteId: Number(estudanteId) }
        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(200).json(novaMatriculaCriada)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }


    static async atualizaMatricula(req, res) {
        const novaInfos = req.body
        const { estudanteId, matriculaId } = req.params
        try {
            await database.Matriculas.update(novaInfos, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            }
            )
            const matriculaAtualizada = await database.Matriculas.findOne({ where: { id: Number(matriculaId) } })
            return res.status(200).json(matriculaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            await database.Matriculas.destroy({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            return res.status(200).json({ mensagem: `id: ${matriculaId} deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

}




module.exports = AlunoController