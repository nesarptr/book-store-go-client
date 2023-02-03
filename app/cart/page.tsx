"use client";

import axios from "../../axiosConfig";
import Cart from "../../components/cart/Cart";
import { useAppDispatch } from "../../store/hook";
import { replaceCart } from "../../store/cartSlice";

export default function Page() {
  const dispatch = useAppDispatch();

  (async () => {
    const res = await axios.get("/shop/cart");
    const { books } = res.data;
    const bookData =
      books?.map(({ book, quantity }: any) => {
        return {
          book: {
            id: book.ID,
            name: book.title,
            owner: book.owner,
            price: book.price,
            imgURL: `https://go-book-store.onrender.com/${book.imgUrl}`,
            description: book.description,
          },
          quantity,
        };
      }) || [];
    dispatch(replaceCart(bookData));
  })();

  return <Cart />;
}
