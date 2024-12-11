"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function CarPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const images = [
    'https://www.pngplay.com/wp-content/uploads/13/BMW-8-Series-Gran-Coupe-Transparent-Free-PNG.png',
    'https://rk.mb-qr.com/media/thumbnails/cards/Front-03_75LQYEt.png.860x860_q95.png',
    'https://www.pngplay.com/wp-content/uploads/13/Porsche-911-Background-PNG-Image.png'
  ];

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
        </div>
      </div>

      {/* Configuration Section */}
      <div style={{ padding: '10px' }}>
        <h2>Конфігурація</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <button
            style={{
              padding: '10px 20px',
              background: 'white',
              border: 'none',
              color: 'black',
              cursor: 'pointer',
              borderRadius: '5px',
              transition: 'background-color 0.3s, transform 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'lightgray'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
            onClick={() => {}}
          >
            Стандарт
          </button>
          <button
            style={{
              padding: '10px 20px',
              background: 'white',
              border: 'none',
              color: 'black',
              cursor: 'pointer',
              borderRadius: '5px',
              transition: 'background-color 0.3s, transform 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'lightgray'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
            onClick={() => {}}
          >
            Спорт
          </button>
          <button
            style={{
              padding: '10px 20px',
              background: 'white',
              border: 'none',
              color: 'black',
              cursor: 'pointer',
              borderRadius: '5px',
              transition: 'background-color 0.3s, transform 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'lightgray'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
            onClick={() => {}}
          >
            Люкс
          </button>
        </div>

        <div style={{ display: 'flex', gap: '30px', alignItems: 'stretch' }}>
          {/* Filters as text (left) */}
          <div style={{ flex: 1, animation: 'fadeIn 1s ease-in-out' }}>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '15px',
                borderRadius: '10px',
                height: '100%',
              }}
            >
              <h3>Фільтри:</h3>
              <ul>
                <li>Колір</li>
                <li>Тип двигуна</li>
                <li>Матеріал салону</li>
                <li>Диски</li>
                <li>Пакети</li>
              </ul>
            </div>
          </div>

          {/* Filters with checkboxes/sliders (right) */}
          <div style={{ flex: 1, animation: 'fadeIn 1s ease-in-out' }}>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '15px',
                borderRadius: '10px',
                height: '100%',
              }}
            >
              <h3>Налаштувати конфігурацію:</h3>
              <form>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" /> Шкіряний салон
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" /> Спортивна підвіска
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>
                    <input type="checkbox" /> Легкосплавні диски
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>Потужність двигуна:</label>
                  <input type="range" min="200" max="800" step="50" />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label>Економія пального:</label>
                  <input type="range" min="5" max="15" step="0.5" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
