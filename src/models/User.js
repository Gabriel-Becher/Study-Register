const { Sequelize, Model } = require("sequelize");
const bcript = require("bcrypt");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 50],
              msg: "name must be between 3 and 50 characters",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          unique: {
            msg: "email already exists",
          },
          validate: {
            isEmail: {
              msg: "email must be a valid email",
            },
            notEmpty: {
              msg: "email cannot be empty",
            },
            len: {
              args: [1, 50],
              msg: "email must have at most 50 characters",
            },
          },
          defaultValue: "",
        },
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: "",
          validate: {
            len: {
              args: [6, 50],
              msg: "password must be between 6 and 50 characters",
            },
            notEmpty: {
              msg: "password cannot be empty",
            },
          },
        },
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: "",
        },
      },
      {
        sequelize,
      }
    );
    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcript.hash(user.password, 10);
      }
    });
    this.bind();
  }
  static associate(models) {
    this.hasMany(models.Workspace, {
      foreignKey: "user_id",
    });
  }

  async checkPassword(password) {
    return await bcript.compare(password, this.password_hash);
  }
}

module.exports = User;
