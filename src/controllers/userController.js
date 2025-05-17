const userService = require("../services/userSevice");

class UserController {
  async getAllUsers(req, res) {
    const { status, errors, data } = await userService.getAllUsers();
    res.status(status).json({ errors, data });
  }

  async getUserById(req, res) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ errors: ["User ID is required"], data: [] });
    }
    const { status, errors, data } = await userService.getUserById(id);
    res.status(status).json({ errors, data });
  }

  async createUser(req, res) {
    const { status, errors, data } = await userService.createUser(req.body);
    return res.status(status).json({ errors, data });
  }

  async updateUser(req, res) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ errors: ["User ID is required"], data: [] });
    }
    const { status, errors, data } = await userService.updateUser(id, req.body);
    return res.status(status).json({ errors, data });
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ errors: ["User ID is required"], data: [] });
    }
    const { status, errors, data } = await userService.deleteUser(id);
    return res.status(status).json({ errors, data });
  }
}

module.exports = new UserController();
