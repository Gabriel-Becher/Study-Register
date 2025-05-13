const { Sequelize, Model } = require("sequelize");

class Workspace extends Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 50],
              msg: "name must be between 3 and 50 characters",
            },
          },
        },
        description: {
          type: Sequelize.TEXT,
          defaultValue: "",
        },
        public: {
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
    this.belongsTo(models.User, { foreignKey: "user_id" });
    this.hasMany(models.Cell, { foreignKey: "workspace_id" });
  }
}

module.exports = Workspace;
