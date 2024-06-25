const database = require('../models')

class DocenteController {
    static async listarDocentes(req, res) {
        try {
            const todosDocentes = await database.docentes.findAll()
            return res.status(200).json(todosDocentes)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaDocente(req, res) {
        const { id } = req.params
        try {
            const UmDocente = await database.docentes.findOne({ where: { id: Number(id) } })
            return res.status(200).json(UmDocente)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaDocente(req, res) {
        const novoDocente = req.body;
        try {
            const novoDocenteCriado = await database.docentes.create(novoDocente)
            return res.status(200).json(novoDocenteCriado);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }


    static async atualizaDocente(req, res) {
        const novaInfo = req.body
        const { id } = req.params
        try {
            await database.docentes.update(novaInfo, { where: { id: Number(id) } })
            const cursoAtualizado = await database.docentes.findOne({ where: { id: Number(id) } })
            return res.status(200).json(cursoAtualizado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletarDocente(req, res) {
        const { id } = req.params
        try {
            await database.docentes.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ mensagem: `Docente, id: ${id} foi deletado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = DocenteController