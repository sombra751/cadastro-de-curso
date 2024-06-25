const database = require('../models');

class CursoService {
  static async criarNovoCurso(novoCurso) {
    try {
      const cursoExiste = await database.Cursos.findOne({
        where: {
          nome: novoCurso.nome
        }
      });

      if (cursoExiste) {
        throw new Error('Já existe um curso com esse nome');
      }

      const novoCursoCriado = await database.Cursos.create(novoCurso);
      return novoCursoCriado;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CursoService;
