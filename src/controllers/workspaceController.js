const workspaceService = require("../services/workspaceService");

class WorkspaceController {
  async getAllWorkspaces(req, res) {
    const { status, errors, data } = await workspaceService.getAllWorkspaces();
    res.status(status).json({ errors, data });
  }

  async getWorkspaceById(req, res) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ error: ["Workspace ID is required"], data: null });
    }
    try {
      const { status, errors, data } = await workspaceService.getWorkspaceById(
        id
      );
      res.status(status).json({ errors, data });
    } catch (error) {
      res.status(500).json({ error: ["Error fetching workspace"], data: null });
    }
  }

  async getWorkspaceById(req, res) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ error: ["Workspace ID is required"], data: null });
    }
    try {
      const { status, errors, data } = await workspaceService.getWorkspaceById(
        id
      );
      res.status(status).json({ errors, data });
    } catch (error) {
      res.status(500).json({ error: ["Error fetching workspace"], data: null });
    }
  }

  async getWorkspaceByUserId(req, res) {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(400)
        .json({ error: ["User ID is required"], data: null });
    }
    try {
      const { status, errors, data } =
        await workspaceService.getWorkspaceByUserId(userId);
      res.status(status).json({ errors, data });
    } catch (error) {
      res
        .status(500)
        .json({ error: ["Error fetching workspaces"], data: null });
    }
  }

  async createWorkspace(req, res) {
    try {
      const workspace = await workspaceService.createWorkspace(req.body);
      return res.status(201).json({ error: [], data: workspace });
    } catch (error) {
      return res
        .status(500)
        .json({ error: ["Error creating workspace"], data: null });
    }
  }

  async updateWorkspace(req, res) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ error: ["Workspace ID is required"], data: null });
    }
    try {
      const workspace = (await workspaceService.getWorkspaceById(id)).data;
      if (!workspace) {
        return res
          .status(404)
          .json({ error: ["Workspace not found"], data: null });
      }
      await workspaceService.updateWorkspace(id, req.body);
      return res.status(200).json({ error: [], data: workspace });
    } catch (error) {
      return res
        .status(500)
        .json({ error: ["Error updating workspace"], data: null });
    }
  }

  async deleteWorkspace(req, res) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ error: ["Workspace ID is required"], data: null });
    }
    try {
      const workspace = (await workspaceService.getWorkspaceById(id)).data;
      if (!workspace) {
        return res
          .status(404)
          .json({ error: ["Workspace not found"], data: null });
      }
      await workspaceService.deleteWorkspace(id);
      return res
        .status(200)
        .json({ error: [], data: "Workspace deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: ["Error deleting workspace"], data: null });
    }
  }
}

module.exports = new WorkspaceController();
