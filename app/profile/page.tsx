"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Якщо токен відсутній, перенаправляємо на сторінку логіну
      router.push("/login");
    } else {
      const userEmail = localStorage.getItem("userEmail");
      setUser({ email: userEmail || "Unknown User" });
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[rgba(255,255,255,0.02)] text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Профіль</h1>
      {user ? (
        <div>
          <p className="text-lg">Ласкаво просимо, {user.email}!</p>
          <p className="mt-2">Ця сторінка містить вашу особисту інформацію.</p>
        </div>
      ) : (
        <p>Завантаження...</p>
      )}
    </div>
  );
};

export default ProfilePage;
