import { useAppSelector } from "../../store/hook";
import BookItem from "./BookItem";

export default function BookList() {
  const books = useAppSelector((state) => state.book);
  return (
    <section>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </section>
  );
}
