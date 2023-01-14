"use client";

import { useEffect } from "react";

import Order from "../../components/dashboard/Order";
import axios from "../../axiosConfig";
import { useAppDispatch } from "../../store/hook";
import { populate } from "../../store/order-slice";

export default function Page() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await axios.get("/shop/order", {
          signal: controller.signal,
        });
        const orders = res.data.orders.map((order: any) => {
          return {
            id: order.id,
            cart: order.books.map((book: any) => {
              return {
                book: {
                  id: book.book._id,
                  name: book.book.name,
                  price: book.book.price,
                  imgURL: book.book.imgURL,
                  description: book.book.description,
                  owner: book.book.owner,
                },
                quantity: book.quantity,
              };
            }),
            totalPrice: order.price,
            isPaid: order.status,
          };
        });
        dispatch(populate(orders));
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  return <Order />;
}
