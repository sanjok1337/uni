const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2");
const authRoutes = require("./routes/auth");



// Створення з'єднання з базою даних
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // твоє ім'я користувача MySQL
  password: "root", // твій пароль до MySQL
  database: "carsell", // назва твоєї БД
});

db.connect((err) => {
  if (err) {
    console.error("Помилка при підключенні до БД:", err);
  } else {
    console.log("Підключено до БД");
  }
});

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Авторизація
app.post("/api/auth/login", (req, res) => {
  console.log("Отримано запит на авторизацію:", req.body);

  const { email, password } = req.body;

  // Знайти користувача за email
  const query = "SELECT * FROM user WHERE email = ?"; // Назва таблиці user, а не users
  console.log("Підготовлено SQL-запит:", query);

  db.execute(query, [email], (err, results) => {
    if (err) {
      console.error("Помилка при пошуку користувача:", err);
      return res.status(500).json({ message: "Помилка серверу" });
    }

    console.log("Результати пошуку у БД:", results);

    if (results.length === 0) {
      console.log("Користувач не знайдений");
      return res.status(404).json({ message: "Користувача не знайдено" });
    }

    const user = results[0];
    console.log("Знайдений користувач:", user);

    // Перевірка пароля
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    console.log("Перевірка пароля:", passwordIsValid);

    if (!passwordIsValid) {
      console.log("Невірний пароль");
      return res.status(401).json({ message: "Невірний пароль" });
    }

    // Генеруємо JWT
    const token = jwt.sign({ id: user.id }, "secret_key", { expiresIn: "1h" });
    console.log("Генерований токен:", token);

    res.status(200).json({ message: "Авторизація успішна", token });
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});

app.use("/api/auth", authRoutes);