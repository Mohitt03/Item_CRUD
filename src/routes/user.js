const express = require("express");
const router = express.Router();
const db = require("../config/db");


// CREATE item
router.post("/", (req, res) => {
  const { name, description } = req.body;

  const sql = "INSERT INTO items (name, description) VALUES (?, ?)";
  db.query(sql, [name, description], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Item created", id: result.insertId });
  });
});


// READ all items
router.get("/", (req, res) => {
  db.query("SELECT * FROM items", (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
});


// READ single item
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM items WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result[0]);
  });
});


// UPDATE item Put
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const sql = "UPDATE items SET name = ?, description = ? WHERE id = ?";
  db.query(sql, [data, id], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Item updated" });
  });
});


//UPDATE item Patch
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const fields = [];
  const values = [];

  if (req.body.name !== undefined) {
    fields.push("name = ?");
    values.push(req.body.name);
  }

  if (req.body.description !== undefined) {
    fields.push("description = ?");
    values.push(req.body.description);
  }

  if (fields.length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  const sql = `UPDATE items SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Item updated successfully" });
  });
});


// DELETE item
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM items WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Item deleted" });
  });
});

module.exports = router;