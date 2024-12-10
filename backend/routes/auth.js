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
  const { email, password, name, phone } = req.body;  // Додано name та phone

  // Перевірка, чи всі поля надані
  if (!email || !password || !name || !phone) {
    return res.status(400).json({ message: "Всі поля повинні бути заповнені!" });
  }

  // Хешування пароля
  const hashedPassword = bcrypt.hashSync(password, 8);

  // Запит до бази даних для реєстрації користувача
  connection.query(
    "INSERT INTO user (email, password, name, phone) VALUES (?, ?, ?, ?)",
    [email, hashedPassword, name, phone],  // Додаємо значення для name і phone
    (error, results) => {
      if (error) {
        return res.status(400).json({ message: "Помилка реєстрації" });
      }
      res.status(200).json({ message: "Реєстрація успішна!" });
    }
  );
});

module.exports = router;
