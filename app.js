const express = require("express");
require("dotenv").config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
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
}

export default new App().app;
