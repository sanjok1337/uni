const express = require("express");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");

const router = express.Router();
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "carsell",
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 8);

  connection.query(
    "INSERT INTO user (email, password) VALUES (?, ?)",
    [email, hashedPassword],
    (error, results) => {
      if (error) {
        return res.status(400).json({ message: "Помилка реєстрації" });
      }
      res.status(200).json({ message: "Реєстрація успішна!" });
    }
  );
});

module.exports = router;
