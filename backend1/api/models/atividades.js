'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Atividades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Atividades.belongsTo(models.aulas, {
        foreignKey: 'aula_id',
        onDelete: 'CASCADE'
      })
      Atividades.hasMany(models.Alternativas, {
        foreignKey: 'atividade_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Atividades.hasMany(models.Respostas, {
        foreignKey: 'atividade_id',
      })
      // Atividades.belongsTo(models.Alternativas, {
      //   foreignKey: 'alternativa_id'
      // })
      // Atividades.belongsTo(models.Alternativas, {
      //   foreignKey: 'alternativa_correta'
      // })
    }
  }
  Atividades.init({
    pergunta: {
      type: DataTypes.STRING, validate: {
        // isUnique: async function (value) {
        //   const atividade = await Atividades.findOne({
        //     where: {
        //       pergunta: value,
        //       id: {
        //         [Op.not]: this.id // Exclui o curso atual da busca
        //       }
        //     }
        //   });
        //   if (atividade) throw new Error('Já existe uma atividade com esse enunciado');
        // }
      }
    }
  }, {
    sequelize,
    modelName: 'Atividades',
  });
  return Atividades;
};