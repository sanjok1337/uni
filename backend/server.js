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

// Маршрут для отримання профілю
app.get("/api/user/profile", (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Токен не надано" });
  }

  // Перевірка токену
  jwt.verify(token, "secret_key", (err, decoded) => {
    if (err) {
      console.error("Помилка при перевірці токену:", err);
      return res.status(403).json({ message: "Невірний токен" });
    }

    // Якщо токен валідний, отримуємо ID користувача з токену
    const userId = decoded.id;

    // Завантажуємо профіль користувача з БД
    const query = "SELECT * FROM user WHERE id = ?";

    db.execute(query, [userId], (err, results) => {
      if (err) {
        console.error("Помилка при отриманні профілю:", err);
        return res.status(500).json({ message: "Помилка серверу" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Користувача не знайдено" });
      }

      const user = results[0];
      res.status(200).json(user);
    });
  });
});

// Маршрут для оновлення профілю
app.put("/api/user/profile", (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Токен не надано" });
  }

  // Перевірка токену
  jwt.verify(token, "secret_key", (err, decoded) => {
    if (err) {
      console.error("Помилка при перевірці токену:", err);
      return res.status(403).json({ message: "Невірний токен" });
    }

    const userId = decoded.id;
    const { name, phone } = req.body;

    // Перевірка, чи всі необхідні дані надані
    if (!name || !phone) {
      return res.status(400).json({ message: "Всі поля повинні бути заповнені" });
    }

    const query = "UPDATE user SET name = ?, phone = ? WHERE id = ?";

    db.execute(query, [name, phone, userId], (err, result) => {
      if (err) {
        console.error("Помилка при оновленні профілю:", err);
        return res.status(500).json({ message: "Помилка серверу" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Користувача не знайдено" });
      }

      res.status(200).json({ message: "Профіль успішно оновлено" });
    });
  });
});

// Оновлення пароля
app.put("/api/user/password", (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Токен не надано" });
  }

  // Перевірка токену
  jwt.verify(token, "secret_key", (err, decoded) => {
    if (err) {
      console.error("Помилка при перевірці токену:", err);
      return res.status(403).json({ message: "Невірний токен" });
    }

    const userId = decoded.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Всі поля повинні бути заповнені" });
    }

    const query = "SELECT * FROM user WHERE id = ?";
    db.execute(query, [userId], (err, results) => {
      if (err) {
        console.error("Помилка при пошуку користувача:", err);
        return res.status(500).json({ message: "Помилка серверу" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Користувача не знайдено" });
      }

      const user = results[0];
      const passwordIsValid = bcrypt.compareSync(oldPassword, user.password);

      if (!passwordIsValid) {
        return res.status(401).json({ message: "Старий пароль невірний" });
      }

      const hashedPassword = bcrypt.hashSync(newPassword, 8);
      const updateQuery = "UPDATE user SET password = ? WHERE id = ?";
      
      db.execute(updateQuery, [hashedPassword, userId], (err, result) => {
        if (err) {
          console.error("Помилка при оновленні пароля:", err);
          return res.status(500).json({ message: "Помилка серверу" });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Користувача не знайдено або нічого не змінилось" });
        }

        res.status(200).json({ message: "Пароль успішно оновлено" });
      });
    });
  });
});

// Оновлення email
app.put("/api/user/email", (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Токен не надано" });
  }

  // Перевірка токену
  jwt.verify(token, "secret_key", (err, decoded) => {
    if (err) {
      console.error("Помилка при перевірці токену:", err);
      return res.status(403).json({ message: "Невірний токен" });
    }

    const userId = decoded.id;
    const { newEmail } = req.body;

    if (!newEmail) {
      return res.status(400).json({ message: "Нове email не надано" });
    }

    const query = "UPDATE user SET email = ? WHERE id = ?";
    
    db.execute(query, [newEmail, userId], (err, result) => {
      if (err) {
        console.error("Помилка при оновленні email:", err);
        return res.status(500).json({ message: "Помилка серверу" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Користувача не знайдено або нічого не змінилось" });
      }

      res.status(200).json({ message: "Email успішно оновлено" });
    });
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});

app.use("/api/auth", authRoutes);
