"use client";

import { useRouter } from "next/navigation";
import Login from "../components/auth/Login";
import Hero from "../components/Home/Hero";
import { useAppSelector } from "../store/hook";

import styles from "./page.module.css";

export default function Page() {
  const router = useRouter();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  !isAuth && router.push("/login");
  return (
    <main className={styles.main}>
      {isAuth && <Hero />}
      {!isAuth && <Login />}
    </main>
  );
}
