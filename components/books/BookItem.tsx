import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useEffect } from "react";

import axios from "../../axiosConfig";
import { Book, deleteBook } from "../../store/book-slice";
import { addToCart } from "../../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/hook";

import styles from "./BookItem.module.css";

export default function BookItem(book: Book) {
  const router = useRouter();
  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();
  const addToCartHandler: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(addToCart(book));
  };
  const isAdmin = userId === book.owner;

  const deleteHandler: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const res = await axios.delete(`/admin/book/${book.id}`);
      // res.data.deleteData._id
      dispatch(deleteBook(res.data.deleteData._id));
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 401) {
        router.replace("/login");
      }
    }
  };

  return (
    <li className={styles.li}>
      <div>
        <Image src={book.imgURL} alt="book Image" width={150} height={200} />
        <div className={styles.div}>
          <p>{book.name}</p>
          <p>${book.price}</p>
          <p>{`${book.description.slice(0, 36)}${
            book.description.length > 35 ? " ..." : ""
          }`}</p>
        </div>
        {isAdmin ? (
          <button type="button" onClick={deleteHandler}>
            Delete
          </button>
        ) : (
          <button type="button" onClick={addToCartHandler}>
            Add to cart
          </button>
        )}
        {isAdmin ? (
          <Link href={`/add-book/${book.id}`}>
            <button type="button">Edit</button>
          </Link>
        ) : (
          <Link href={`/books/${book.id}`}>
            <button type="button">Details</button>
          </Link>
        )}
      </div>
    </li>
  );
}
