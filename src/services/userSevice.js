const { Op } = require("sequelize");
const User = require("../models/User");
const Workspace = require("../models/Workspace");

class UserService {
  static async getAllUsers(name) {
    try {
      if(!name) {
        name = "";
      }
      const users = await User.findAll({
        attributes: {
          exclude: ["password_hash"],
        },
        include: [
          {
            model: Workspace,
            attributes: ["id", "title", "description", "public"],
          },
        ],
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      });

      if (!users || users.length === 0) {
        return { status: 204, errors: [], data: [] };
      }
      return { status: 200, errors: [], data: users };
    } catch (error) {
      return {
        status: 500,
        errors: error.errors?.map((x) => {
          x.message;
        }) ?? ["Error fetching users"],
        data: [],
      };
    }
  }

  static async getUserById(id) {
    try {
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password_hash"] },
        include: [
          {
            model: Workspace,
            attributes: ["id", "title", "description", "public"],
          },
        ],
      });
      if (!user) {
        return { status: 204, errors: [], data: [] };
      }
      return { status: 200, errors: [], data: user };
    } catch (error) {
      return {
        status: 500,
        errors: error.errors?.map((x) => {
          x.message;
        }) ?? ["Error fetching user"],
        data: [],
      };
    }
  }

  static async createUser(userData) {
    try {
      const exists = await this.checkExists(userData.email);
      if (exists) {
        return { status: 401, errors: ["User already exists"], data: [] };
      }

      let { name, email, password } = userData;

      name = name.trim();
      email = email.trim();
      password = password.trim();

      const newUser = await User.create({
        name,
        email,
        password,
      });

      return { status: 201, errors: [], data: { id: newUser.id, name, email } };
    } catch (error) {
      return {
        status: 500,
        errors: [error.errors?.map((x) => x.message)] ?? [
          "Error creating user",
        ],
        data: [],
      };
    }
  }

  static async updateUser(id, userData) {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        return { status: 404, errors: ["User not found"], data: [] };
      }

      for (const key in userData) {
        if (key in user) {
          if (key === "id") {
            return {
              status: 401,
              errors: ["User ID cannot be updated"],
              data: [],
            };
          }
          user[key] = userData[key];
        }
      }

      const result = user.save();

      return {
        status: 200,
        errors: [],
        data: {
          id: result.id,
          name: result.name,
          email: result.email,
        },
      };
    } catch (error) {
      return {
        status: 500,
        errors: error.errors?.map((x) => {
          x.message;
        }) ?? ["Error updating user"],
        data: [],
      };
    }
  }

  static async deleteUser(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return { status: 404, errors: ["User not found"], data: [] };
      }
      await user.destroy();
      return { status: 200, errors: [], data: [] };
    } catch (error) {
      return {
        status: 500,
        errors: error.errors?.map((x) => {
          x.message;
        }) ?? ["Error deleting user"],
        data: [],
      };
    }
  }

  static async checkExists(email) {
    try {
      const user = await User.findOne({ where: { email } });
      if (user) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}

module.exports = UserService;
