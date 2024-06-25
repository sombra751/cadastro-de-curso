'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class aulas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      aulas.hasMany(models.Atividades, {
        foreignKey: 'aula_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })

      aulas.belongsTo(models.Materias, {
        foreignKey: 'materia_id',
        onDelete: 'CASCADE'
      })
    }
  }
  aulas.init({
    nome: DataTypes.STRING,
    youtubeUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'aulas',
  });
  return aulas;
};