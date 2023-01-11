import OrderItem from "./OrderItem";
import { useAppSelector } from "../../store/hook";

import styles from "./Order.module.css";

export default function Order() {
  const orders = useAppSelector((state) => state.order.order);
  return (
    <main className={styles.main}>
      {!orders.length && <p>You did not place any order yet</p>}
      {orders.slice(0, 1).map((order) => (
        <OrderItem key={order.id} {...order} />
      ))}
    </main>
  );
}
