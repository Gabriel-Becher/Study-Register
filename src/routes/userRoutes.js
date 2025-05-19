const { Router } = require("express");
const userController = require("../controllers/userController");
const tokenController = require("../controllers/tokenController");
const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:id", tokenController.verifyToken, userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
