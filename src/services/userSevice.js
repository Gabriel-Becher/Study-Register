const User = require("../models/User");
const Workspace = require("../models/Workspace");

const bcrypt = require("bcrypt");

class UserService {
  static async getAllUsers() {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      });
      if (!users || users.length === 0) {
        return { status: 404, errors: ["No users found"], data: [] };
      }
      return { status: 200, errors: [], data: users };
    } catch (error) {
      console.log(error);
      return { status: 500, errors: [error], data: null };
    }
  }

  static async getUserById(id) {
    try {
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        return { status: 404, errors: ["User not found"], data: null };
      }
      return { status: 200, errors: [], data: user };
    } catch (error) {
      return { status: 500, errors: ["Error fetching user"], data: null };
    }
  }

  static async createUser(userData) {
    try {
      const { name, email, password } = userData;
      errors = [];
      !name && errors.push("Name is required");
      !email && errors.push("Email is required");
      !password && errors.push("Password is required");
      if (errors.length > 0) {
        return { status: 400, errors, data: null };
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      return { status: 201, errors: [], data: newUser };
    } catch (error) {
      return { status: 500, errors: ["Error creating user"], data: null };
    }
  }

  static async updateUser(id, userData) {
    try {
      const { name, email, password } = userData;
      const user = await User.findByPk(id);
      if (!user) {
        return { status: 404, errors: ["User not found"], data: null };
      }
      name ? user.name : name;
      email ? user.email : email;

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
      const result = await user.save();
      return { status: 200, errors: [], data: result };
    } catch (error) {
      return { status: 500, errors: ["Error updating user"], data: null };
    }
  }

  static async deleteUser(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return { status: 404, errors: ["User not found"], data: null };
      }
      await user.destroy();
      return { status: 200, errors: [], data: null };
    } catch (error) {
      return { status: 500, errors: ["Error deleting user"], data: null };
    }
  }
}

module.exports = UserService;
