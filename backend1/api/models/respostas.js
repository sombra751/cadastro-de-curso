'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Respostas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Respostas.belongsTo(models.Atividades, {
        foreignKey: 'atividade_id',
      })
    }
  }
  Respostas.init({
    respondido: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Respostas',
  });
  return Respostas;
};