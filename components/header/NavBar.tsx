"use client";
import Link from "next/link";
import { useState } from "react";

import CartIcon from "../cart/CartIcon";
import { useAppSelector } from "../../store/hook";

import styles from "./NavBar.module.css";

export default function NavBar() {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const [clicked, setClicked] = useState(false);
  return (
    <>
      {isAuth && (
        <>
          <nav className={`${styles.nav} ${clicked ? styles.clicked : ""}`}>
            <ul
              className={`${styles["nav-list"]} ${
                clicked ? styles.clicked : ""
              }`}
            >
              <li className={styles.svg}>
                <Link href={"/cart"}>
                  <CartIcon />
                </Link>
              </li>
              <li>
                <Link href={"/books"} title="Books">
                  Books
                </Link>
              </li>
              <li>
                <Link href={"/add-book"} title="add book">
                  Add Book
                </Link>
              </li>
              <li>
                <Link href={"/my-books"} title="my books">
                  My Books
                </Link>
              </li>
              <li>
                <Link href={"/orders"} title="my orders">
                  My Orders
                </Link>
              </li>
              <li>
                <Link href={"/logout"}>Logout</Link>
              </li>
            </ul>
          </nav>

          <div
            className={`${styles.hamburger} ${clicked ? styles.clicked : ""}`}
            onClick={() => setClicked((pc) => !pc)}
          >
            <span className={styles["line-1"]}></span>
            <span className={styles["line-2"]}></span>
            <span className={styles["line-3"]}></span>
          </div>
        </>
      )}
      {!isAuth && (
        <Link href={"/login"} className={styles.a}>
          Login
        </Link>
      )}
    </>
  );
}
