"use client";

import Hero from "../components/Home/Hero";

import styles from "./page.module.css";

export default function Page() {
  return (
    <main className={styles.main}>
      <Hero />
    </main>
  );
}
