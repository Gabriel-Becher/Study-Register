const { Router } = require("express");
const tokenController = require("../controllers/tokenController");

const router = Router();

router.post("/", tokenController.generateToken);

module.exports = router;
