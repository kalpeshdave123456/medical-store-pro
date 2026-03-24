const router = require("express").Router();
const pool = require("../db");

router.post("/", async (req, res) => {
  const { items, total, cost } = req.body;

  const sale = await pool.query(
    "INSERT INTO sales(total,cost) VALUES($1,$2) RETURNING *",
    [total, cost]
  );

  for (let item of items) {
    await pool.query(
      "INSERT INTO sale_items(sale_id,product_id,qty,price) VALUES($1,$2,$3,$4)",
      [sale.rows[0].id, item.id, item.qty, item.price]
    );

    await pool.query(
      "UPDATE inventory SET qty = qty - $1 WHERE id=$2",
      [item.qty, item.id]
    );
  }

  res.json(sale.rows[0]);
});

module.exports = router;
