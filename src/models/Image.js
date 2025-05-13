const { Sequelize, Model } = require("sequelize");
const config = require("../config/config");

class Image extends Model {
  static init(sequelize) {
    super.init(
      {
        filename: {
          type: Sequelize.STRING,
          defaultValue: "",
        },
        position: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${config.url}/images/${this.getDataValue("filename")}`;
          },
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

module.exports = Image;
