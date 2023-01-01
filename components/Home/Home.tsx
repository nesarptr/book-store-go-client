import React from "react";

import Header from "../header/Header";
import Footer from "./Footer";
import { useAppSelector, useAppDispatch } from "../../store/hook";

import styles from "./Home.module.css";

export default function Home({ children }: { children: React.ReactNode }) {
  const isModalOpen = useAppSelector((state) => state.ui);
  return (
    <body>
      {isModalOpen && <div className={styles.backdrop}></div>}
      <Header />
      <main>{children}</main>
      <Footer />
    </body>
  );
}
