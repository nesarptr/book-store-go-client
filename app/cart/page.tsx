"use client";

import axios from "../../axiosConfig";
import Cart from "../../components/cart/Cart";
import { useAppDispatch } from "../../store/hook";
import { replaceCart } from "../../store/cartSlice";

export default function Page() {
  const dispatch = useAppDispatch();

  (async () => {
    const res = await axios.get("/shop/cart");
    const bookData = res.data.map(({ book, quantity }: any) => {
      return {
        book: {
          id: book._id,
          name: book.name,
          owner: book.owner,
          price: book.price,
          imgURL: book.imgURL,
          description: book.description,
        },
        quantity,
      };
    });
    dispatch(replaceCart(bookData));
  })();

  return <Cart />;
}
