require("dotenv").config();

const express = require("express");

const { join, resolve } = require("path");
const { existsSync, mkdirSync } = require("fs");

require("./src/database");

const userRoutes = require("./src/routes/userRoutes");
const workspaceRoutes = require("./src/routes/workspaceRoutes");
const cellRoutes = require("./src/routes/cellRoutes");
const textfieldRoutes = require("./src/routes/textfieldsRoutes");
const imageRoutes = require("./src/routes/imageRoutes");
const tokenRoutes = require("./src/routes/tokenRoutes");

class App {
  constructor() {
    this.app = express();
    this.uploadPath();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(resolve(__dirname, "uploads")));
  }

  routes() {
    this.app.use("/users", userRoutes);
    this.app.use("/workspaces", workspaceRoutes);
    this.app.use("/cells", cellRoutes);
    this.app.use("/textfields", textfieldRoutes);
    this.app.use("/pictures", imageRoutes);
    this.app.use("/login", tokenRoutes);
  }

  uploadPath() {
    if (!existsSync(join(__dirname, "uploads", "images"))) {
      mkdirSync(join(__dirname, "uploads"));
      mkdirSync(join(__dirname, "uploads", "images"));
    }
  }
}

module.exports = new App().app;
