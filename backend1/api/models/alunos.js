'use strict';
const {
  Model, 
  Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alunos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Alunos.belongsTo(models.Cursos, {
        foreignKey: 'curso_id'
      })
      // Alunos.hasMany(models.Cursos, {
      //   foreignKey: 'docente_id'
      // })
      Alunos.hasMany(models.Matriculas, {
        foreignKey: 'estudante_id',
        scope: { status: 'confirmado' },
        as: 'aulasMatriculadas'
      })
    }
  }
  Alunos.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        funcaoValidadora: function (dado) {
          if (dado.length < 3) throw new Error('o campo deve ter mais de 3 caracteres');
        }
      }
    },
    telefone: {
      type: DataTypes.STRING,
      validate: {
        isUnique: async function (value) {
          const aluno = await Alunos.findOne({
            where: {
              telefone: value,
              id: {
                [Op.not]: this.id // Exclui o aluno atual da busca
              }
            }
          });
          if (aluno) throw new Error('Já existe um aluno com esse telefone');
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'dados do tipo e-mail inválido'
        }
      }
    },
    cep: {
      type: DataTypes.STRING,
      validate: {
        isCEP: function(value) {
          const cepRegex = /^\d{5}-\d{3}$/;
          if (!cepRegex.test(value)) {
            throw new Error('CEP inválido');
          }
        }
      }
    },
    numero: DataTypes.INTEGER,
    complemento: DataTypes.STRING,
    rua: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cidade: DataTypes.STRING,
    estado: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Alunos',
    defaultScope: {
      attributes:{
        exclude: ['password']
      }
    }
    // paranoid: true,
    // scopes: {
    //   todos: { where: {} },
    // }
  });
  return Alunos;
};