'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Materias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Materias.hasMany(models.aulas, {
        foreignKey: 'materia_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Materias.belongsTo(models.Cursos, {
        foreignKey: 'curso_id'
      })
    }
  }
  Materias.init({
    nome: {
      type: DataTypes.STRING,
      // unique: true,
      // validate: {
      //   isUnique: async function (value) {
      //     const materia = await Materias.findOne({
      //       where: {
      //         nome: value,
      //         id: {
      //           [Op.not]: this.id // Exclui o materia atual da busca
      //         }
      //       }
      //     });
      //     if (materia) throw new Error('Já existe uma matéria com esse nome');
      //   }
      // }
    },
    // youtube_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Materias',
  });
  return Materias;
};