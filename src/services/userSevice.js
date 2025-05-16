const { where } = require("sequelize");
const User = require("../models/User");
const Workspace = require("../models/Workspace");

const bcrypt = require("bcrypt");

class UserService {
  static async getAllUsers() {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password_hash"] },
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
      const exists = await this.checkExists(userData.email);
      if (exists) {
        return { status: 401, error: ["User already exists"], data: null };
      }

      let { name, email, password } = userData;

      name = name.trim();
      email = email.trim();
      password = password.trim();

      const errors = [];
      !name && errors.push("Name is required");
      !email && errors.push("Email is required");
      !password && errors.push("Password is required");
      if (errors.length > 0) {
        return { status: 400, errors, data: null };
      }

      const newUser = await User.create({
        name,
        email,
        password,
      });
      return { status: 201, errors: [], data: newUser };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        errors: [error /* "Error creating user" */],
        data: null,
      };
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

  static async checkExists(email) {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return true;
    }
    return false;
  }
}

module.exports = UserService;
