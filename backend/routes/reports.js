const router = require("express").Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  const revenue = await pool.query("SELECT SUM(total) FROM sales");
  const cost = await pool.query("SELECT SUM(cost) FROM sales");

  const r = revenue.rows[0].sum || 0;
  const c = cost.rows[0].sum || 0;

  res.json({
    revenue: r,
    cost: c,
    profit: r - c
  });
});

module.exports = router;
