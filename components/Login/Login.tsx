// app/login.tsx
"use client";

import React, { useState } from "react";
import { Input, Button, Spacer, Card } from "@nextui-org/react";
import { useAuthContext } from "@/context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuthContext();

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
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log("Успішна авторизація", data);

      login(data.token);
    } catch (error: any) {
      console.error("Помилка авторизації", error);
      setError(error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f5f5f5",
      }}
    >
      <Card style={{ maxWidth: "400px", padding: "20px" }}>
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
          />
          <Spacer y={1.5} />
          <Button type="submit" fullWidth>
            Увійти
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
