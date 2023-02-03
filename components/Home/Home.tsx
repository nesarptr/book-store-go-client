import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

import axios from "../../axiosConfig";
import Header from "../header/Header";
import Footer from "./Footer";
import { useAppSelector, useAppDispatch } from "../../store/hook";
import { addBooks } from "../../store/book-slice";
import { login } from "../../store/auth-slice";

import { useEffect } from "react";
import { AxiosError } from "axios";

export default function Home({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.userId);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      const res = await axios.get("/auth/jwt", {
        signal: controller.signal,
      });
      Cookies.set("jwtoken", res.data.token);
      const decoded = jwt_decode(res.data.token) as any;
      dispatch(
        login({
          isAuth: true,
          jwtoken: res.data.token,
          userId: decoded.id,
          userEmail: decoded.email,
        })
      );
    })().catch((err) => {
      const error = err as AxiosError;
      if (error.response?.status === 401) {
        router.replace("/login");
      }
    });
    return () => {
      controller.abort();
    };
  }, [dispatch, router]);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      const res = await axios.get("/shop/books", { signal: controller.signal });
      const books = res.data.map((book: any) => {
        return {
          id: book.ID,
          owner: book.owner,
          name: book.title,
          price: book.price,
          imgURL: `https://go-book-store.onrender.com/${book.imgUrl}`,
          description: book.description,
        };
      });
      dispatch(addBooks(books));
    })().catch((err) => {
      const error = err as AxiosError;
      if (error.response?.status === 401) {
        router.replace("/login");
      }
    });

    return () => {
      controller.abort();
    };
  }, [dispatch, userId, router]);

  return (
    <body>
      <div id="backdrop-root"></div>
      <div id="overlay-root"></div>
      <Header />
      <main>{children}</main>
      <Footer />
    </body>
  );
}
