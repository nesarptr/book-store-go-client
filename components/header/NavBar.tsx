"use client";
import Link from "next/link";
import { MouseEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import CartIcon from "../cart/CartIcon";
import { logout } from "../../store/auth-slice";
import { useAppDispatch, useAppSelector } from "../../store/hook";

import styles from "./NavBar.module.css";

export default function NavBar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const logoutHandler: MouseEventHandler = () => {
    Cookies.remove("jwtoken");
    dispatch(logout());
    router.replace("/login");
  };

  const [clicked, setClicked] = useState(false);
  return (
    <>
      {isAuth && (
        <>
          <nav className={`${styles.nav} ${clicked ? styles.clicked : ""}`}>
            <ul
              onClick={() => setClicked((pc) => !pc)}
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
              <li onClick={logoutHandler}>
                <Link href={"/login"}>Logout</Link>
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
