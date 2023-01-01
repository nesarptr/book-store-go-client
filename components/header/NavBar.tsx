"use client";
import Link from "next/link";
import { useState } from "react";
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
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
                <Link href={"/my-orders"} title="my orders">
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
