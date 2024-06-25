const database = require('../models')


class RespostaController {
    static async pegaTodasRespostas(req, res) {
        try {
            const todasAsRespostas = await database.Respostas.findAll()
            res.status(200).json(todasAsRespostas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    // static async criarResposta(req, res) {
    //     const { atividade_id, novaResposta } = req.body;
    //     try {
    //         const atividade = await database.Atividades.findByPk(atividade_id);
    //         if (!atividade) {
    //             return res.status(404).json({  error: 'Atividade não encontrada back' });
    //         }
    
    //         novaResposta.atividade_id = atividade_id;
    //         novaResposta.respondido = true;
    
    //         const resposta = await database.Respostas.create({
    //             atividade_id: atividade_id,
    //             respondido: true,
    //             // Adicione outros campos necessários aqui, se houver
    //         });
    
    //         return res.status(200).json(resposta);
    //     } catch (error) {
    //         return res.status(500).json({ error: error.message });
    //     }
    // }
    
    
    static async criarResposta({ body: { atividade_id, respondido } }, res) {
        try {
            const atividade = await database.Atividades.findByPk(atividade_id);
            if (!atividade) {
                return res.status(404).json({ error: 'Atividade não encontrada' });
            }
    
            const resposta = await database.Respostas.create({
                atividade_id,
                respondido: respondido || false, // Se respondido não estiver presente no corpo da requisição, assume o valor false
            });
    
            return res.status(200).json(resposta);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async deletaResposta(req,res) {
        const {id} = req.params
        try {
            await database.Respostas.destroy({where: {id: Number(id)}})
            res.status(200).json({mensagem: `Resposta, id: ${id} foi deletado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
        
    }

   
    
}

module.exports = RespostaController