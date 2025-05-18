"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("textfields", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [1, 500],
            msg: "Text must be between 1 and 500 characters",
          },
        },
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            args: true,
            msg: "Position must be an integer",
          },
          min: {
            args: 0,
            msg: "Position must be greater than or equal to 0",
          },
        },
      },
      cell_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "cells",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("textfields");
  },
};
