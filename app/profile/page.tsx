"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [user, setUser] = useState<{ email: string; name: string; phone: string } | null>(null);
  const [orders, setOrders] = useState<any[]>([]); // Стан для замовлень
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      // Отримуємо дані профілю
      fetch("http://localhost:5000/api/user/profile", {
        method: "GET",
        headers: {
          "Authorization": token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            console.error(data.message);
            setUser(null);
          } else {
            setUser({
              email: data.email,
              name: data.name || "Не вказано",
              phone: data.phone || "Не вказано",
            });
            setName(data.name || "");
            setPhone(data.phone || "");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Помилка при завантаженні профілю:", error);
          setLoading(false);
        });

      // Отримуємо замовлення користувача
      fetch("http://localhost:5000/api/orders", {
        method: "GET",
        headers: {
          "Authorization": token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            console.error(data.message);
          } else {
            setOrders(data.orders || []); // Встановлюємо замовлення в стан
          }
        })
        .catch((error) => {
          console.error("Помилка при завантаженні замовлень:", error);
        });
    }
  }, [router]);

  const handleSaveProfile = () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    fetch("http://localhost:5000/api/user/profile", {
      method: "PUT",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        phone: phone,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.error(data.message);
        } else {
          setUser({
            ...user!,
            name: name,
            phone: phone,
          });
          setIsEditing(false);
          setSuccessMessage("Профіль успішно оновлено!");
          setTimeout(() => setSuccessMessage(""), 3000);
        }
      })
      .catch((error) => {
        console.error("Помилка при оновленні профілю:", error);
      });
  };

  const handleChangePassword = () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    fetch("http://localhost:5000/api/user/password", {
      method: "PUT",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.error(data.message);
        } else {
          alert("Пароль успішно оновлено");
        }
      })
      .catch((error) => {
        console.error("Помилка при оновленні пароля:", error);
      });
  };

  const handleChangeEmail = () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    fetch("http://localhost:5000/api/user/email", {
      method: "PUT",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newEmail,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.error(data.message);
        } else {
          alert("Email успішно оновлено");
          setUser({ ...user!, email: newEmail });
        }
      })
      .catch((error) => {
        console.error("Помилка при оновленні email:", error);
      });
  };

  return (
    <div className="min-h-screen bg-[rgba(255,255,255,0.02)] text-white p-6">
      {successMessage && (
        <div className="bg-green-500 text-white p-3 rounded-lg mb-4 text-center">
          {successMessage}
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4">Профіль</h1>
      {loading ? (
        <div className="flex justify-center items-center min-h-[150px]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        user && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Профіль користувача */}
            <div className="bg-[rgba(255,255,255,0.1)] p-4 rounded-lg flex flex-col items-center transition-all transform hover:bg-gradient-to-r hover:from-[rgba(255,255,255,0.3)] hover:to-[rgba(255,255,255,0.1)] hover:scale-105">
              <img
                src="https://via.placeholder.com/100"
                alt="Profile Picture"
                className="w-24 h-24 rounded-full mb-3 border-4 border-blue-500"
              />
              <p className="text-sm">{user.email}</p>
              <button className="mt-3 px-3 py-1 bg-white text-black rounded-lg shadow hover:bg-gray-200 transition">Змінити фотографію</button>
            </div>

            {/* Особиста інформація */}
            <div className="bg-[rgba(255,255,255,0.1)] p-4 rounded-lg flex flex-col justify-center items-center transition-all transform hover:bg-gradient-to-r hover:from-[rgba(255,255,255,0.3)] hover:to-[rgba(255,255,255,0.1)] hover:scale-105">
              <h2 className="text-lg font-semibold mb-1">Особиста інформація</h2>
              <div className="w-full text-center">
                {isEditing ? (
                  <>
                    <label>Ім'я:</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-transparent p-2 text-white mb-2"
                    />
                  </>
                ) : (
                  <p>Ім'я: {user.name}</p>
                )}
              </div>
              <div className="w-full text-center">
                {isEditing ? (
                  <>
                    <label>Телефон:</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-transparent p-2 text-white mb-2"
                    />
                  </>
                ) : (
                  <p>Телефон: {user.phone}</p>
                )}
              </div>
              <button
                onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
                className="mt-3 px-3 py-1 bg-white text-black rounded-lg shadow hover:bg-gray-200 transition"
              >
                {isEditing ? "Зберегти" : "Редагувати профіль"}
              </button>
            </div>
          </div>
        )
      )}

      {/* Редагування пароля */}
      <div className="mt-6 bg-[rgba(255,255,255,0.1)] p-4 rounded-lg max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold mb-2">Змінити пароль</h2>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Старий пароль"
          className="bg-transparent p-2 text-white mb-2"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Новий пароль"
          className="bg-transparent p-2 text-white mb-2"
        />
        <button
          onClick={handleChangePassword}
          className="px-3 py-1 bg-white text-black rounded-lg shadow hover:bg-gray-200 transition"
        >
          Змінити пароль
        </button>
      </div>

      {/* Редагування Email */}
      <div className="mt-6 bg-[rgba(255,255,255,0.1)] p-4 rounded-lg max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold mb-2">Змінити Email</h2>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Новий email"
          className="bg-transparent p-2 text-white mb-2"
        />
        <button
          onClick={handleChangeEmail}
          className="px-3 py-1 bg-white text-black rounded-lg shadow hover:bg-gray-200 transition"
        >
          Змінити Email
        </button>
      </div>

      {/* Замовлення користувача */}
      <div className="mt-6 bg-[rgba(255,255,255,0.1)] p-4 rounded-lg max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold mb-2">Ваші замовлення</h2>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div key={index} className="bg-white text-black p-4 rounded-lg">
                <p><strong>Номер замовлення:</strong> {order.id}</p>
                <p><strong>Дата:</strong> {new Date(order.date).toLocaleDateString()}</p>
                <p><strong>Товари:</strong> {order.items.join(", ")}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>У вас немає замовлень.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
