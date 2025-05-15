const Workspace = require("../models/workspace");
const User = require("../models/user");

class WorkspaceService {
  static async getAllWorkspaces() {
    try {
      const workspaces = await Workspace.findAll();
      if (!workspaces || workspaces.length === 0) {
        return { status: 404, errors: ["No workspaces found"], data: [] };
      }
      return { status: 200, errors: [], data: workspaces };
    } catch (error) {
      console.log(error);
      return { status: 500, errors: [error], data: null };
    }
  }

  static async getWorkspaceById(id) {
    try {
      const workspace = await Workspace.findByPk(id);
      if (!workspace) {
        return { status: 404, errors: ["Workspace not found"], data: null };
      }
      return { status: 200, errors: [], data: workspace };
    } catch (error) {
      return { status: 500, errors: ["Error fetching workspace"], data: null };
    }
  }

  static async getWorkspaceByUserId(userId) {
    try {
      const workspaces = await Workspace.findAll({
        where: { userId },
      });
      if (!workspaces || workspaces.length === 0) {
        return {
          status: 404,
          errors: ["No workspaces found for this user"],
          data: [],
        };
      }
      return { status: 200, errors: [], data: workspaces };
    } catch (error) {
      return { status: 500, errors: ["Error fetching workspaces"], data: null };
    }
  }

  static async createWorkspace(workspaceData) {
    try {
      const { name, userId } = workspaceData;
      const errors = [];
      !name && errors.push("Name is required");
      !userId && errors.push("User ID is required");
      if (errors.length > 0) {
        return { status: 400, errors, data: null };
      }
      const newWorkspace = await Workspace.create({
        name,
        userId,
      });
      return { status: 201, errors: [], data: newWorkspace };
    } catch (error) {
      return { status: 500, errors: ["Error creating workspace"], data: null };
    }
  }

  static async updateWorkspace(id, workspaceData) {
    try {
      const { name } = workspaceData;
      const workspace = await Workspace.findByPk(id);
      if (!workspace) {
        return { status: 404, errors: ["Workspace not found"], data: null };
      }
      name ? (workspace.name = name) : name;
      await workspace.save();
      return { status: 200, errors: [], data: workspace };
    } catch (error) {
      return { status: 500, errors: ["Error updating workspace"], data: null };
    }
  }

  static async deleteWorkspace(id) {
    try {
      const workspace = await Workspace.findByPk(id);
      if (!workspace) {
        return { status: 404, errors: ["Workspace not found"], data: null };
      }
      await workspace.destroy();
      return { status: 200, errors: [], data: null };
    } catch (error) {
      return { status: 500, errors: ["Error deleting workspace"], data: null };
    }
  }
}

module.exports = WorkspaceService;
