const { Sequelize, Model } = require("sequelize");

class Cell extends Model {
  static init(sequelize) {
    super.init(
      {
        position: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        weight: {
          type: Sequelize.INTEGER,
          defaultValue: 1,
        },
        done: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Workspace, { foreignKey: "workspace_id" });
    this.hasMany(models.Cell, { foreignKey: "subcell_id", as: "subcells" });
    this.belongsTo(models.Cell, { foreignKey: "subcell_id", as: "parent" });
    this.hasMany(models.Image, { foreignKey: "cell_id" });
    this.hasMany(models.TextField, { foreignKey: "cell_id" });
  }
}

module.exports = Cell;
