import { MouseEventHandler, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { addToCart } from "../../store/cartSlice";
import { useAppSelector, useAppDispatch } from "../../store/hook";

import styles from "../Home/Hero.module.css";
import { Book } from "../../store/book-slice";

export default function BookDetail({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const book = useAppSelector((state) =>
    state.book.books.find((book) => book.id == id)
  );

  const addToCartHandler: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(addToCart(book as Book));
  };

  return (
    <main className={styles.hero}>
      <div>
        <h2>{book?.name}</h2>
        <p>{book?.description}</p>
        <p id={styles.p}>${book?.price}</p>
        <Link href={`/books`} title="All Books">
          <button type="button" onClick={addToCartHandler}>
            Add To Cart
          </button>
        </Link>
      </div>
      <div>
        <Image
          src={book?.imgURL as string}
          alt={book?.name as string}
          width={600}
          height={400}
        />
      </div>
    </main>
  );
}
