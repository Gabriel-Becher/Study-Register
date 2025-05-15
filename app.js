const express = require("express");
require("dotenv").config();
const path = require("path");
const fs = require("fs");
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
  }

  routes() {
    this.app.get("/", (req, res) => {
      res.send("Hello World!");
    });
  }

  uploadPath(){
    if(!fs.existsSync(path.join(__dirname, "uploads", "images"))){ 
      fs.mkdirSync(path.join(__dirname, "uploads"));
      fs.mkdirSync(path.join(__dirname, "uploads", "images"));
    }
  }
}

module.exports = new App().app;
