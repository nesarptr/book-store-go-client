import { useAppSelector } from "../../store/hook";

import styles from "./Cart.module.css";
import CartItem from "./CartItem";

export default function Cart() {
  const books = useAppSelector((state) => state.cart);
  const totalPrice = books.reduce<number>(
    (acc, cur) => acc + +cur.book.price * cur.quantity,
    0
  );

  return (
    <main className={styles.main}>
      <h2>Your Book Cart</h2>
      <ul>
        {books.map((book) => (
          <CartItem key={book.book.id} book={book} total={totalPrice} />
        ))}
      </ul>
    </main>
  );
}
