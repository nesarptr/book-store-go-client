import { useRouter } from "next/navigation";
import { useEffect } from "react";

import BookItem from "./BookItem";
import { useAppSelector } from "../../store/hook";

import styles from "./BookList.module.css";

export default function BookList({
  shouldFilter = false,
}: {
  shouldFilter?: boolean;
}) {
  const userId = useAppSelector((state) => state.auth.userId);
  const books = useAppSelector((state) => state.book.books).filter((book) =>
    shouldFilter ? book.owner == userId : true
  );
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.replace("/login");
    }
  }, [isAuth, router]);
  return (
    <main className={styles.main}>
      {books.length > 0 ? (
        <ul>
          {books.map((book) => {
            return <BookItem key={book.id} {...book} />;
          })}
        </ul>
      ) : (
        <p id={styles.p}>No Products Found</p>
      )}
    </main>
  );
}
