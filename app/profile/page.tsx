"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [user, setUser] = useState<{ email: string; status: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Якщо токен відсутній, перенаправляємо на сторінку логіну
      router.push("/login");
    } else {
      const userEmail = localStorage.getItem("userEmail");
      setUser({ email: userEmail || "Unknown User", status: "Онлайн" });
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[rgba(255,255,255,0.02)] text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Профіль</h1>
      {user ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Ліва колонка: Фотографія профілю */}
          <div className="bg-[rgba(255,255,255,0.1)] p-4 rounded-lg flex flex-col items-center transition-all transform hover:bg-gradient-to-r hover:from-[rgba(255,255,255,0.3)] hover:to-[rgba(255,255,255,0.1)] hover:scale-105">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile Picture"
              className="w-24 h-24 rounded-full mb-3 border-4 border-blue-500"
            />
            <p className="text-sm">{user.email}</p>
            <p className="mt-1 text-xs text-green-400">{user.status}</p>
            <button className="mt-3 px-3 py-1 bg-white text-black rounded-lg shadow hover:bg-gray-200 transition">Змінити фотографію</button>
          </div>

          {/* Права колонка: Особиста інформація */}
          <div className="bg-[rgba(255,255,255,0.1)] p-4 rounded-lg transition-all transform hover:bg-gradient-to-r hover:from-[rgba(255,255,255,0.3)] hover:to-[rgba(255,255,255,0.1)] hover:scale-105">
            <h2 className="text-lg font-semibold mb-1">Особиста інформація</h2>
            <p>Ім'я: Ім'я користувача</p>
            <p>Електронна пошта: {user.email}</p>
            <p>Телефон: +380 12 345 67 89</p>
            <p>Адреса: Київ, Україна</p>
            <button className="mt-3 px-3 py-1 bg-white text-black rounded-lg shadow hover:bg-gray-200 transition">Редагувати профіль</button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[150px]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      {/* Нижній контейнер: Замовлення */}
      <div className="bg-[rgba(255,255,255,0.1)] p-4 mt-4 rounded-lg transition-all transform hover:bg-gradient-to-r hover:from-[rgba(255,255,255,0.3)] hover:to-[rgba(255,255,255,0.1)] hover:scale-105 max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold mb-1">Мої замовлення</h2>
        <p>У вас ще немає замовлень.</p>
      </div>

      {/* Соціальні посилання */}
      <div className="bg-[rgba(255,255,255,0.1)] p-4 mt-4 rounded-lg flex justify-center space-x-3 transition-all transform hover:bg-gradient-to-r hover:from-[rgba(255,255,255,0.3)] hover:to-[rgba(255,255,255,0.1)] hover:scale-105 max-w-4xl mx-auto">
        <a href="#" className="text-blue-500 hover:text-blue-600 transition">
          <i className="fab fa-facebook fa-lg"></i>
        </a>
        <a href="#" className="text-blue-400 hover:text-blue-500 transition">
          <i className="fab fa-twitter fa-lg"></i>
        </a>
        <a href="#" className="text-blue-700 hover:text-blue-800 transition">
          <i className="fab fa-linkedin fa-lg"></i>
        </a>
      </div>
    </div>
  );
};

export default ProfilePage;