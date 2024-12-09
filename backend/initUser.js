const bcrypt = require("bcryptjs");
const mysql = require("mysql2");

// Підключення до БД
const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // заміни на твій логін до БД
  password: "root", // заміни на твій пароль до БД
  database: "carsell",
});

connection.connect();

// Створити хеш для пароля
const hashedPassword = bcrypt.hashSync("password123", 8);

// Створити нового користувача
connection.query(
  "INSERT INTO user (email, password) VALUES (?, ?)",
  ["testuserr@example.com", hashedPassword],
  (error, results) => {
    if (error) {
      console.error("Помилка при створенні користувача", error);
    } else {
      console.log("Користувача створено:", results);
    }
    connection.end();
  }
);
