import ReactDOM from "react-dom";

import { MouseEventHandler, useState } from "react";
import { OrderModel } from "../../store/order-slice";
import Cart from "../cart/Cart";

import styles from "./OrderItem.module.css";

export default function OrderItem(order: OrderModel) {
  const [isOpen, setIsOpen] = useState(false);

  const overlayHandler: MouseEventHandler<HTMLElement> = () => {
    setIsOpen((s) => !s);
  };

  const btnValue = order.isPaid ? "PAID" : "Pay";
  return (
    <>
      {isOpen &&
        ReactDOM.createPortal(
          <div className={styles.backdrop} onClick={overlayHandler}></div>,
          document.getElementById("backdrop-root") as Element
        )}

      {isOpen &&
        ReactDOM.createPortal(
          <div className={styles.overlay} onClick={overlayHandler}>
            <Cart
              orderBooks={{ books: order.cart, totalPrice: order.totalPrice }}
            />
          </div>,
          document.getElementById("overlay-root") as Element
        )}

      <div className={styles.div}>
        <p>{order.id}</p>
        <div>
          <button type="button">{btnValue}</button>
          <button type="button" onClick={overlayHandler}>
            Details
          </button>
        </div>
      </div>
    </>
  );
}
