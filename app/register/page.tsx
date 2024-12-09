"use client";

import React, { useState } from "react";
import { Input, Button, Spacer, Card } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Помилка при реєстрації");
      }

      alert("Реєстрація успішна!");
      router.push("/login");
    } catch (err: any) {
      console.error("Помилка:", err);
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
        background: "#f5f5f5",
      }}
    >
      <Card style={{ maxWidth: "400px", padding: "20px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Реєстрація</h1>
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
            Зареєструватися
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

export default Register;
