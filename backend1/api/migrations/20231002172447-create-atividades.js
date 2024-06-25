'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Atividades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pergunta: {
        type: Sequelize.STRING
      },
      aula_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'aulas', key: 'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      // alternativa_correta: {
      //   allowNull: true,
      //   type: Sequelize.INTEGER,
      //   references: {model: 'Alternativas', key: 'id'},
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Atividades');
  }
};