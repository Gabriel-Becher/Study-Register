const userService = require('../services/userSevice');

const User = require('../models/User');

class UserController {
  async getAllUsers(req, res) {
      const {status, errors, data} = await userService.getAllUsers();
      res.status(status).json({errors, data});
    }

  async getUserById(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: ['User ID is required'], data: null });
    }
    try {
      const {status, errors, data} = await userService.getUserById(id);
      res.status(status).json({errors, data});
    } catch (error) {
      res.status(500).json({ error: ['Error fetching user'], data: null });
    }
  }
}

const controller = new UserController();

module.exports = controller;