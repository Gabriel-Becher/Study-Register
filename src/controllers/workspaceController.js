const workspaceService = require("../services/workspaceService");

class WorkspaceController {
  async getAllWorkspaces(req, res) {
    const { title } = req.query;
    const { status, errors, data } = await workspaceService.getAllWorkspaces(title);
    res.status(status).json({ errors, data });
  }

  async getWorkspaceById(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ errors: ["Workspace ID is required"], data: [] });
    }
    const { status, errors, data } = await workspaceService.getWorkspaceById(id);
    res.status(status).json({ errors, data });
    
  }

  async getWorkspacesByUserId(req, res) {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: ["User ID is required"], data: [] });
    }
    const { status, errors, data } = await workspaceService.getWorkspacesByUserId(userId);
    res.status(status).json({ errors, data });
    
  }

  async createWorkspace(req, res) {
    const {status, errors, data} = await workspaceService.createWorkspace(req.body);
    return res.status(status).json({ errors, data});
  }

  async updateWorkspace(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ errors: ["Workspace ID is required"], data: [] });
    }
    const { status, errors, data } = await workspaceService.updateWorkspace(id, req.body);
    return res.status(status).json({ errors, data });
  }

  async deleteWorkspace(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: ["Workspace ID is required"], data: null });
    }
    const {status, errors, data }= await workspaceService.deleteWorkspace(id);
    return res.status(status).json({ errors, data });
    
  }
}

module.exports = new WorkspaceController();
