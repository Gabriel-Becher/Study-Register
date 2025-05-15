const { Router } = require("express");

const workspaceController = require("../controllers/workspaceController");

const router = Router();

router.get("/", workspaceController.getAllWorkspaces);
router.get("/:id", workspaceController.getWorkspaceById);
router.get("/user/:userId", workspaceController.getWorkspaceByUserId);
router.post("/", workspaceController.createWorkspace);
router.put("/:id", workspaceController.updateWorkspace);
router.delete("/:id", workspaceController.deleteWorkspace);

module.exports = router;
