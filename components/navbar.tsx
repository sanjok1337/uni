"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar as NextUINavbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import { useAuthContext } from "@/context/AuthContext"; // Імпортуємо контекст

export const Navbar = () => {
  const { isAuthenticated, login, logout } = useAuthContext(); // Використовуємо контекст
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    logout(); // Очищаємо контекст
    router.push("/"); // Перенаправляємо назад на головну
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  if (!isMounted) return null; // Уникаємо SSR помилок

  return (
    <NextUINavbar
      maxWidth="2xl"
      className="bg-[rgba(255,255,255,0.02)] py-4"
      position="sticky"
    >
      <NavbarContent className="basis-1/5" justify="start">
        <Link href="/" className="text-white">
          Car Sell
        </Link>
      </NavbarContent>

      <NavbarContent className="basis-3/5" justify="end">
        <NavbarItem>
          <Button onClick={() => router.push("/carlist")}>Каталог</Button>
        </NavbarItem>

        {isAuthenticated ? (
          <>
            <NavbarItem>
              <Link href="/profile" className="text-white">Профіль</Link>
            </NavbarItem>
            <NavbarItem>
              <span className="cursor-pointer text-white" onClick={handleLogout}>Вийти</span>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Button onClick={handleLoginRedirect}>Авторизація</Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </NextUINavbar>
  );
};