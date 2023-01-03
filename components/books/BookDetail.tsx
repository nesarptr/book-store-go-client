import Link from "next/link";
import Image from "next/image";

import { useAppSelector } from "../../store/hook";

import styles from "../Home/Hero.module.css";

export default function BookDetail({ id }: { id: string }) {
  const book = useAppSelector((state) =>
    state.book.find((book) => book.id == id)
  );
  return (
    <main className={styles.hero}>
      <div>
        <h2>{book?.name}</h2>
        <p>{book?.description}</p>
        <p id={styles.p}>${book?.price}</p>
        <Link href={`/books`} title="All Books">
          <button type="button">Add To Cart</button>
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
