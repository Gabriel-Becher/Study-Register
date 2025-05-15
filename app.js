require("dotenv").config();

const express = require("express");

const { join, resolve } = require("path");
const { existsSync, mkdirSync } = require("fs");

require("./src/database")

const userRoutes = require("./src/routes/userRoutes");
class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.uploadPath();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(resolve(__dirname, "..", "uploads")));
  }

  routes() {
    this.app.use("/users", userRoutes);
  }

  uploadPath(){
    if(!existsSync(join(__dirname, "uploads", "images"))){ 
      mkdirSync(join(__dirname, "uploads"));
      mkdirSync(join(__dirname, "uploads", "images"));
    }
  }
}

module.exports = new App().app;
