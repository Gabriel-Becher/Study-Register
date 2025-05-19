"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("images", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      filename: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          len: {
            args: [1, 255],
            msg: "Filename must be between 1 and 255 characters",
          },
          notNull: {
            msg: "Filename cannot be null",
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
    await queryInterface.dropTable("images");
  },
};
