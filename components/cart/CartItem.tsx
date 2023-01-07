import { useAppDispatch } from "../../store/hook";

import { BookCart, addToCart, removeFromCart } from "../../store/cartSlice";

import styles from "./CartItem.module.css";
import { MouseEventHandler } from "react";

export default function CartItem({ book, quantity }: BookCart) {
  const dispatch = useAppDispatch();

  const { name: title, id, price } = book;

  const removeItemHandler: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(removeFromCart(id));
  };

  const addItemHandler: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(addToCart(book));
  };

  return (
    <li className={styles.item}>
      <header>
        <h3>{title}</h3>
        <div className={styles.price}>
          ${Number(+price * quantity).toFixed(2)}{" "}
          <span className={styles.itemprice}>
            (${Number(price).toFixed(2)}/item)
          </span>
        </div>
      </header>
      <div className={styles.details}>
        <div className={styles.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={removeItemHandler}>
            -
          </button>
          <button type="button" onClick={addItemHandler}>
            +
          </button>
        </div>
      </div>
    </li>
  );
}
