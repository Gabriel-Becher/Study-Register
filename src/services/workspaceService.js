const { Op } = require("sequelize");
const Workspace = require("../models/Workspace");
const User = require("../models/User");
class WorkspaceService {
  static async getAllWorkspaces(title) {
    try {
      title = title ? title : "";
      const workspaces = await Workspace.findAll(
        {
          where: {
            title: {
              [Op.like]: `%${title}%`,
            },
          },
          include: [
            {
              model: User,
              attributes: ["id", "name"],
            },
          ],
        }
      );
      if (!workspaces || workspaces.length === 0) {
        return { status: 404, errors: ["No workspaces found"], data: [] };
      }
      return { status: 200, errors: [], data: workspaces };
    } catch (error) {
      console.log(error)
      return {
        status: 500,
        errors: error.errors?.map((x) => {
          x.message;
        }) ?? ["Error fetching workspaces"],
        data: [],
      };
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
      return {
        status: 500,
        errors: error.errors?.map((x) => {
          x.message;
        }) ?? ["Error fetching workspace"],
        data: [],
      };
    }
  }

  static async getWorkspacesByUserId(userId) {
    try {
      const workspaces = await Workspace.findAll({
        where: { user_id: userId },
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
      return {
        status: 500,
        errors: error.errors?.map((x) => {
          x.message;
        }) ?? ["Error fetching workspaces"],
        data: [],
      };
    }
  }

  static async createWorkspace(workspaceData) {
    try {
      const newWorkspace = await Workspace.create(workspaceData);
      return { status: 201, errors: [], data: newWorkspace };
    } catch (error) {
      return {
        status: 500,
        errors: error.errors?.map((x) => {
          x.message;
        }) ?? ["Error creating workspace"],
        data: [],
      };
    }
  }

  static async updateWorkspace(id, workspaceData) {
    try {
      const workspace = await Workspace.findByPk(id);
      if(!workspace) {
        return { status: 404, errors: ["Workspace not found"], data: [] };
      }
      for (const key in workspaceData) {
        if (key in workspace) {
          if (key === "id"|| key === "user_id") {
            return {
              status: 401,
              errors: ["User ID cannot be updated"],
              data: [],
            };
          }
          workspace[key] = workspaceData[key];
        }
      }
      await workspace.save();
      return { status: 200, errors: [], data: workspace };
    } catch (error) {
      return {
        status: 500,
        errors: error.errors?.map((x) => {
          x.message;
        }) ?? ["Error updating workspace"],
        data: [],
      };
    }
  }

  static async deleteWorkspace(id) {
    try {
      const workspace = await Workspace.findByPk(id);
      if (!workspace) {
        return { status: 404, errors: ["Workspace not found"], data: [] };
      }
      await workspace.destroy();
      return { status: 200, errors: [], data: [] };
    } catch (error) {
      return {
        status: 500,
        errors: error.errors?.map((x) => {
          x.message;
        }) ?? ["Error deleting workspace"],
        data: [],
      };
    }
  }
}

module.exports = WorkspaceService;
