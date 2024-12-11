"use client";

import React, { useState } from "react";
import { Input, Button, Spacer, Card } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Помилка при авторизації");
      }

      const data = await response.json();
      console.log("Успішна авторизація:", data);

      localStorage.setItem("token", data.token);

      router.push("/");
    } catch (err: any) {
      console.error("Помилка авторизації:", err);
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#121212", // Темний фон
        color: "#ffffff", // Світлий текст
      }}
    >
      <Card
        style={{
          maxWidth: "400px",
          padding: "20px",
          background: "#1e1e1e", // Темний фон картки
          color: "#ffffff",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Авторизація</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            placeholder="Введіть email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            style={{ color: "#ffffff" }}
          />
          <Spacer y={1.5} />
          <Input
            label="Пароль"
            placeholder="Введіть пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            style={{ color: "#ffffff" }}
          />
          <Spacer y={1.5} />
          <Button type="submit" fullWidth>
            Увійти
          </Button>
          <Spacer y={1} />
          <Button
            onClick={() => router.push("/register")}
            fullWidth
            css={{ backgroundColor: "#6666FF", color: "white" }}
          >
            Перейти до реєстрації
          </Button>
          {error && (
            <p style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
              {error}
            </p>
          )}
        </form>
      </Card>
    </div>
  );
};

export default Login;
