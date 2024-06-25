'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alternativas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Alternativas.belongsTo(models.Atividades, {
        foreignKey: 'atividade_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      // Alternativas.hasMany(models.Atividades, {
      //   foreignKey: 'alternativa_id'
      // })  
      // Alternativas.hasOne(models.Atividades, {
      //   foreignKey: 'alternativa_correta'
      // })
    }
  }
  Alternativas.init({
    texto: DataTypes.STRING,
    alternativaCorreta: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Alternativas',
  });
  return Alternativas;
};