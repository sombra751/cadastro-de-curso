'use strict';
const {
  Model,
  Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cursos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cursos.hasMany(models.Materias, {
        foreignKey: 'curso_id'
      })
      Cursos.hasMany(models.Alunos, {
        foreignKey: 'curso_id'
      })   
      Cursos.hasMany(models.Matriculas, {
        foreignKey: 'curso_id'
      })
      Cursos.belongsTo(models.docentes, {
        foreignKey: 'docente_id'
      })       
    }
  }
  Cursos.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        isUnique: async function (value) {
          const curso = await Cursos.findOne({
            where: {
              nome: value,
              id: {
                [Op.not]: this.id // Exclui o curso atual da busca
              }
            }
          });
          if (curso) throw new Error('Já existe um curso com esse nome1');
        }
      }
    },
    descricao: DataTypes.STRING,
    duracao: DataTypes.INTEGER,
    data_inicio: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Cursos',
  });
  return Cursos;
};