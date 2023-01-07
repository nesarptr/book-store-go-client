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
    <main className={styles.cart}>
      <h2>{books.length > 0 ? "Your Book Cart" : "Your cart is Empty"}</h2>
      <ul>
        {books.map((book) => (
          <CartItem key={book.book.id} {...book} />
        ))}
      </ul>
      {books.length > 0 && (
        <div className={styles.div}>
          <div>
            <p>Total Price</p>
            <p>${totalPrice}</p>
          </div>
          <button type="button">Order</button>
        </div>
      )}
    </main>
  );
}
