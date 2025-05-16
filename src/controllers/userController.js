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
        .json({ error: ["User ID is required"], data: null });
    }
    try {
      const { status, errors, data } = await userService.getUserById(id);
      res.status(status).json({ errors, data });
    } catch (error) {
      res.status(500).json({ error: ["Error fetching user"], data: null });
    }
  }

  async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      return res.status(201).json({ error: [], data: user });
    } catch (error) {
      return res
        .status(500)
        .json({ error: ["Error creating User"], data: null });
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ error: ["User ID is required"], data: null });
    }
    try {
      const user = (await userService.getUserById(id)).data;
      if (!user) {
        return res.status(404).json({ error: ["User not found"], data: null });
      }
      const { status, error, data } = await userService.updateUser(
        id,
        req.body
      );
      return res.status(status).json({ error, data });
    } catch (error) {
      return res
        .status(500)
        .json({ error: ["Error updating user"], data: null });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ error: ["User ID is required"], data: null });
    }
    try {
      const { data } = await userService.getUserById(id);
      if (!data) {
        return res.status(404).json({ error: ["User not found"], data: null });
      }
      await data.destroy();
      return res
        .status(200)
        .json({ error: [], data: "User deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: ["Error deleting user"], data: null });
    }
  }
}

module.exports = new UserController();
