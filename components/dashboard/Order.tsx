import { useEffect } from "react";
import { useRouter } from "next/navigation";
import OrderItem from "./OrderItem";
import { useAppSelector } from "../../store/hook";

import styles from "./Order.module.css";

export default function Order() {
  const orders = useAppSelector((state) => state.order.order);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.replace("/login");
    }
  }, [isAuth, router]);
  return (
    <main className={styles.main}>
      {!orders.length && <p>You did not place any order yet</p>}
      {orders.map((order) => (
        <OrderItem key={order.id} {...order} />
      ))}
    </main>
  );
}
