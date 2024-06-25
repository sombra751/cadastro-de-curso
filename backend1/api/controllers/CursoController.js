const database = require('../models')
const CursoService = require('../services/cursoService')

class CursoController {
    static async pegarTodosOsCursos(req, res) {
        try {
            const todosOsCusos = await database.Cursos.findAll()
            return res.status(200).json(todosOsCusos)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmCurso(req, res) {
        const { id } = req.params
        try {
            const UmCurso = await database.Cursos.findOne({ where: { id: Number(id) } })
            return res.status(200).json(UmCurso)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaUmCurso(req, res) {
        const novoCurso = req.body;
        try {
            const novoCursoCriado = await CursoService.criarNovoCurso(novoCurso)
            return res.status(200).json(novoCursoCriado);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }


    static async atualizaUmCurso(req, res) {
        const novaInfo = req.body
        const { id } = reqa.params
        try {
            await database.Cursos.update(novaInfo, { where: { id: Number(id) } })
            const cursoAtualizado = await database.Cursos.findOne({ where: { id: Number(id) } })
            return res.status(200).json(cursoAtualizado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletarUmCurso(req, res) {
        const { id } = req.params
        try {
            await database.Cursos.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ mensagem: `Curso, id: ${id} foi deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = CursoController