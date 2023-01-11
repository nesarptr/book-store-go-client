import { useAppDispatch } from "../../store/hook";
import { BookCart, addToCart, removeFromCart } from "../../store/cartSlice";

import styles from "./CartItem.module.css";
import { MouseEventHandler } from "react";

export default function CartItem({
  bookCart,
  orderMode = false,
}: {
  bookCart: BookCart;
  orderMode?: boolean;
}) {
  const dispatch = useAppDispatch();

  const { name: title, id, price } = bookCart.book;

  const removeItemHandler: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(removeFromCart(id));
  };

  const addItemHandler: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(addToCart(bookCart.book));
  };

  return (
    <li className={styles.item}>
      <header>
        <h3>{title}</h3>
        <div className={styles.price}>
          ${Number(+price * bookCart.quantity).toFixed(2)}{" "}
          <span className={styles.itemprice}>
            (${Number(price).toFixed(2)}/item)
          </span>
        </div>
      </header>
      <div className={styles.details}>
        <div className={styles.quantity}>
          x <span>{bookCart.quantity}</span>
        </div>
        {!orderMode && (
          <div className={styles.actions}>
            <button type="button" onClick={removeItemHandler}>
              -
            </button>
            <button type="button" onClick={addItemHandler}>
              +
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
