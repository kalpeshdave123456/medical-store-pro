const router = require("express").Router();
const pool = require("../db");

router.get("/low-stock", async (req, res) => {
  const data = await pool.query("SELECT * FROM inventory WHERE qty < 10");
  res.json(data.rows);
});

router.get("/expiry", async (req, res) => {
  const data = await pool.query(
    "SELECT * FROM inventory WHERE expiry < NOW() + INTERVAL '30 days'"
  );
  res.json(data.rows);
});

module.exports = router;
