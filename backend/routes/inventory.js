const router = require("express").Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  const data = await pool.query("SELECT * FROM inventory ORDER BY id DESC");
  res.json(data.rows);
});

router.post("/", async (req, res) => {
  const { name, qty, cost, price, expiry } = req.body;

  const data = await pool.query(
    "INSERT INTO inventory(name,qty,cost,price,expiry) VALUES($1,$2,$3,$4,$5) RETURNING *",
    [name, qty, cost, price, expiry]
  );

  res.json(data.rows[0]);
});

router.put("/:id", async (req, res) => {
  const { qty } = req.body;

  await pool.query("UPDATE inventory SET qty=$1 WHERE id=$2", [
    qty,
    req.params.id,
  ]);

  res.send("Updated");
});

module.exports = router;
