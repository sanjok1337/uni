"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function CarPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [configuration, setConfiguration] = useState("Стандарт");
  const [color, setColor] = useState("Чорний");

  const images = [
    'https://www.pngplay.com/wp-content/uploads/13/BMW-8-Series-Gran-Coupe-Transparent-Free-PNG.png',
    'https://rk.mb-qr.com/media/thumbnails/cards/Front-03_75LQYEt.png.860x860_q95.png',
    'https://www.pngplay.com/wp-content/uploads/13/Porsche-911-Background-PNG-Image.png'
  ];

  const colors = ["Чорний", "Білий", "Червоний", "Синій", "Зелений"];
  const colorCodes = {
    "Чорний": "#000",
    "Білий": "#fff",
    "Червоний": "#f00",
    "Синій": "#00f",
    "Зелений": "#0f0"
  };

  const configurations = {
    "Стандарт": {
      "Тип двигуна": "Бензиновий",
      "Салон": "Тканина",
      "Диски": "Стандартні",
      "Пакети": "Базовий",
      "Ціна": 95000
    },
    "Спорт": {
      "Тип двигуна": "Бензиновий, турбований",
      "Салон": "Алькантара",
      "Диски": "Спортивні",
      "Пакети": "Спортивний",
      "Ціна": 105000
    },
    "Люкс": {
      "Тип двигуна": "Гібрид",
      "Салон": "Шкіряний",
      "Диски": "Преміум",
      "Пакети": "Люкс",
      "Ціна": 125000
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsFadingOut(false);
      }, 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: 0, margin: 0 }}>
      <Head>
        <title>Car Page</title>
      </Head>

      {/* Image Section */}
      <div style={{ position: 'relative', width: '100%', height: '50vh', overflow: 'hidden', marginTop: '60px' }}>
        <img
          src={images[currentImageIndex]}
          alt="Car"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transition: 'opacity 1s ease-in-out',
            opacity: isFadingOut ? 0 : 1
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '50%',
            background: 'linear-gradient(transparent, black)'
          }}
        />
      </div>

      {/* Car Model Section */}
      <div style={{ padding: '10px', borderBottom: '1px solid gray' }}>
        <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '15px', borderRadius: '10px' }}>
          <h2>BMW 8 Series Gran Coupe</h2>
          <p>Конфігурація: {configuration}</p>
          <p>Колір: {color}</p>
        </div>
      </div>

      {/* Configuration Section */}
      <div style={{ padding: '10px' }}>
        <h2>Конфігурація</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          {['Стандарт', 'Спорт', 'Люкс'].map((config) => (
            <button
              key={config}
              style={{
                padding: '10px 20px',
                background: configuration === config ? 'gray' : 'white',
                border: 'none',
                color: 'black',
                cursor: 'pointer',
                borderRadius: '5px',
                transition: 'background-color 0.3s, transform 0.2s'
              }}
              onClick={() => setConfiguration(config)}
            >
              {config}
            </button>
          ))}
        </div>

        {/* Color Picker Section */}
        <h3>Оберіть колір:</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
          {colors.map((clr) => (
            <div
              key={clr}
              onClick={() => setColor(clr)}
              style={{
                width: '40px',
                height: '40px',
                background: colorCodes[clr],
                borderRadius: '50%',
                border: color === clr ? '3px solid white' : '2px solid gray',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {color === clr && <span style={{ color: 'white' }}>✔</span>}
            </div>
          ))}
        </div>

        {/* Details Section */}
        <div style={{ marginTop: '20px', background: 'rgba(255, 255, 255, 0.1)', padding: '15px', borderRadius: '10px' }}>
          <h3>Деталі конфігурації:</h3>
          <ul>
            <li>Тип двигуна: {configurations[configuration]["Тип двигуна"]}</li>
            <li>Салон: {configurations[configuration]["Салон"]}</li>
            <li>Диски: {configurations[configuration]["Диски"]}</li>
            <li>Пакети: {configurations[configuration]["Пакети"]}</li>
          </ul>
        </div>

        {/* Order Button and Price */}
        <div style={{ textAlign: 'center', marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
          <button
            style={{
              padding: '15px 30px',
              background: 'green',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
            onClick={() => alert(`Замовлено конфігурацію: ${configuration}, Колір: ${color}, Ціна: ${configurations[configuration]["Ціна"]}€`)}
          >
            Замовити
          </button>
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{configurations[configuration]["Ціна"]}€</span>
        </div>
      </div>
    </div>
  );
}
