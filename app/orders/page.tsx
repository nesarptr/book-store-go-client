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
        const orders = res.data.map((order: any) => {
          return {
            id: order.ID,
            cart: order.books.map((book: any) => {
              return {
                book: {
                  id: book.bookId,
                  name: book.title,
                  price: book.price,
                  imgURL: `https://go-book-store.onrender.com/${book.imgUrl}`,
                  description: book.description,
                  owner: book.owner,
                },
                quantity: book.quantity,
              };
            }),
            totalPrice: order.totalPrice,
            isPaid: order.isPaid,
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
