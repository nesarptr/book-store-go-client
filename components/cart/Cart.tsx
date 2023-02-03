import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "../../store/hook";
import { replaceCart } from "../../store/cartSlice";
import CartItem from "./CartItem";
import axios from "../../axiosConfig";

import styles from "./Cart.module.css";
import { MouseEventHandler } from "react";
import { BookCart } from "../../store/cartSlice";

export default function Cart({
  orderBooks,
}: {
  orderBooks?: { books: BookCart[]; totalPrice: number };
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.cart.bookCart);
  if (orderBooks) {
    return (
      <main className={styles.cart}>
        <h2>Your Ordered Books</h2>
        <ul>
          {orderBooks.books.map((book) => (
            <CartItem
              key={book.book.id}
              bookCart={{ ...book }}
              orderMode={true}
            />
          ))}
        </ul>

        <div className={styles.div}>
          <div>
            <p>Total Price</p>
            <p>${orderBooks.totalPrice}</p>
          </div>
        </div>
      </main>
    );
  }

  const totalPrice = books.reduce<number>(
    (acc, cur) => acc + +cur.book.price * cur.quantity,
    0
  );

  const orderHandler: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      await axios.post("/shop/order");
      dispatch(replaceCart([]));
    } catch (error) {
      console.error(error);
    } finally {
      router.replace("/orders");
    }
  };

  return (
    <main className={styles.cart}>
      <h2>{books.length > 0 ? "Your Book Cart" : "Your cart is Empty"}</h2>
      <ul>
        {books.map((book) => (
          <CartItem key={book.book.id} bookCart={{ ...book }} />
        ))}
      </ul>
      {books.length > 0 && (
        <div className={styles.div}>
          <div>
            <p>Total Price</p>
            <p>${totalPrice}</p>
          </div>
          <button type="button" onClick={orderHandler}>
            Order
          </button>
        </div>
      )}
    </main>
  );
}
