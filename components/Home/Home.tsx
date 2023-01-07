import Cookies from "js-cookie";

import axios from "../../axiosConfig";
import Header from "../header/Header";
import Footer from "./Footer";
import { useAppSelector, useAppDispatch } from "../../store/hook";
import { addBooks } from "../../store/book-slice";
import { login } from "../../store/auth-slice";

import styles from "./Home.module.css";
import { useEffect } from "react";
import { AxiosError } from "axios";

export default function Home({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.book);

  useEffect(() => {
    (async () => {
      const res = await axios.get("/auth/isAuth");
      dispatch(
        login({
          isAuth: true,
          jwtoken: Cookies.get("jwtoken") as string,
          userId: res.data.userId,
          userEmail: res.data.email,
        })
      );
    })().catch((err) => {
      const error = err as AxiosError;
      if (error.status === 401) {
        Cookies.remove("jwtoken");
      }
      console.log(err);
    });
    return () => {};
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const res = await axios.get("/shop/books");
      console.log(res.data);
      const books = res.data.books.map((book: any) => {
        return {
          id: book._id,
          name: book.name,
          price: book.price,
          imgURL: book.imgURL,
          description: book.description,
        };
      });
      dispatch(addBooks(books));
    })().catch((err) => console.log(err));

    return () => {};
  }, [dispatch, books]);

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
