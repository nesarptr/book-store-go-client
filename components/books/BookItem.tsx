import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler } from "react";

import { Book } from "../../store/book-slice";
import { addToCart } from "../../store/cartSlice";
import { useAppDispatch } from "../../store/hook";

import styles from "./BookItem.module.css";

export default function BookItem(book: Book) {
  const dispatch = useAppDispatch();
  const addToCartHandler: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(addToCart(book));
  };

  return (
    <li className={styles.li}>
      <div>
        <Image src={book.imgURL} alt="book Image" width={300} height={200} />
        <div className={styles.div}>
          <p>{book.name}</p>
          <p>${book.price}</p>
          <p>{`${book.description.slice(0, 36)}${
            book.description.length > 35 ? " ..." : ""
          }`}</p>
        </div>
        <button type="button" onClick={addToCartHandler}>
          Add to cart
        </button>
        <Link href={`/books/${book.id}`}>
          <button type="button">Details</button>
        </Link>
      </div>
    </li>
  );
}
