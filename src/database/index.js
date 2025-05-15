const { Sequelize } = require("sequelize");
const databaseConfig = require("../config/database");
const User = require("../models/User");
const Workspace = require("../models/Workspace");
const Cell = require("../models/Cell");
const TextField = require("../models/TextField");
const Image = require("../models/Image");

const models = [User, Workspace, Cell, TextField, Image];

const connection = new Sequelize({
  ...databaseConfig,
  dialect: "postgres",
  models,
});

models.forEach((model) => model.init(connection));
models.forEach((model) => {
  model.associate && model.associate(connection.models);
});
