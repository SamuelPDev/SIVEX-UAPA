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

sequelize.authenticate()
  .then(() => console.log("✅ Conectado a MySQL"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));