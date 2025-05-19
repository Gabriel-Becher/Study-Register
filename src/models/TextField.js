const { Sequelize, Model } = require("sequelize");

class Textfield extends Model {
  static init(sequelize) {
    super.init(
      {
        text: {
          type: Sequelize.TEXT,
          defaultValue: "",
        },
        position: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Cell, { foreignKey: "cell_id" });
  }
}

module.exports = Textfield;
