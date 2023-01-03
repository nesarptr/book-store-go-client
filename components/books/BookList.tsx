import BookItem from "./BookItem";
import { useAppSelector } from "../../store/hook";

import styles from "./BookList.module.css";

export default function BookList() {
  const books = useAppSelector((state) => state.book);
  return (
    <main className={styles.main}>
      <ul>
        {books.length > 0 &&
          books.map((book) => {
            return <BookItem key={book.id} {...book} />;
          })}
      </ul>
    </main>
  );
}
