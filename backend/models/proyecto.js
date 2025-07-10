const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Proyecto", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    category: { 
      type: DataTypes.ENUM("Extensionista","Voluntariado"), 
      allowNull: false 
    },
    description: { type: DataTypes.TEXT, allowNull: false },
  }, {
    tableName: "proyectos",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
};

const express = require("express");
const router = express.Router();
const { Proyecto } = require("../models");

// GET /api/proyectos
router.get("/", async (req, res) => {
  const list = await Proyecto.findAll({ order: [["created_at","DESC"]] });
  res.json(list);
});

// POST /api/proyectos
router.post("/", async (req, res) => {
  try {
    const nuevo = await Proyecto.create(req.body);
    res.status(201).json(nuevo);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// PUT /api/proyectos/:id
router.put("/:id", async (req, res) => {
  try {
    await Proyecto.update(req.body, { where: { id: req.params.id } });
    const updated = await Proyecto.findByPk(req.params.id);
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE /api/proyectos/:id
router.delete("/:id", async (req, res) => {
  await Proyecto.destroy({ where: { id: req.params.id } });
  res.status(204).end();
});

module.exports = router;