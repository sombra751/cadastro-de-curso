const database = require('../models')

class Services {
    constructor(nomeDoModelo) {
        this.nomeDoModelo = nomeDoModelo
    }
    async pegaTodosOsRegistros() {
        return database[this.nomeDoModelo].findAll()
    }

    async pegaUmRegistro(id) {

    }
    
    async criaUmRegistro(dados) {

    }

    async atualizaRegistro(dadosAtualizado, id, transacao = {}) {
        return database[this.nomeDoModelo]
        .update(dadosAtualizado, {where:{id:id}}, transacao)
    }

    async atualizaRegistros(dadosAtualizado, where, transacao = {}) {
        return database[this.nomeDoModelo]
        .update(dadosAtualizado, {where:{...where}}, transacao)
    }



    async apagaRegistro(id) {
        
    }
}

module.exports = Services