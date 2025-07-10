const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

const cors = require("cors");
app.use(cors());

const Proyecto = require("./proyecto")(sequelize);
module.exports = { sequelize, Proyecto };

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./models");
const proyectosRouter = require("./routes/proyectos");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/proyectos", proyectosRouter);

sequelize.sync();

sequelize.authenticate()
  .then(() => console.log("✅ Conectado a MySQL"))
  .catch(console.error);

app.listen(4000, () => console.log("🚀 API escuchando en http://localhost:3000"));