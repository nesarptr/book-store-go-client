import axios from "axios";

import Header from "../header/Header";
import Footer from "./Footer";
import { useAppSelector, useAppDispatch } from "../../store/hook";
import { addBooks } from "../../store/book-slice";

import styles from "./Home.module.css";

export default function Home({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  (async () => {
    const books = (
      await axios.get("https://dummyjson.com/products/")
    ).data.products.map((p: any) => {
      return {
        id: p.id,
        name: p.title,
        price: p.price,
        imgURL: p.thumbnail,
        description: p.description,
      };
    });
    dispatch(addBooks(books));
  })().catch((err) => console.log(err));

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
