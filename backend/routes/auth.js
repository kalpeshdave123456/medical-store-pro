const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  const user = await pool.query(
    "INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *",
    [name, email, hash]
  );

  res.json(user.rows[0]);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

  if (!user.rows.length) return res.status(400).send("User not found");

  const valid = await bcrypt.compare(password, user.rows[0].password);
  if (!valid) return res.status(400).send("Invalid password");

  const token = jwt.sign({ id: user.rows[0].id }, "SECRET");
  res.json({ token });
});

module.exports = router;
