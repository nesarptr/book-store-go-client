import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAppSelector } from "../../store/hook";

import styles from "./Hero.module.css";

export default function Hero() {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.replace("/login");
    }
  }, [isAuth, router]);
  return (
    <section className={styles.hero}>
      <div>
        <h2>Book Store</h2>
        <p>
          We Provide Best Quality Books. Our book store is the {"World's"} best
          book shop. Get the newest and top selling books all over the World.
        </p>
        <Link href={`/books`} title="All Books">
          <button type="button">Get Started</button>
        </Link>
      </div>
      <div>
        <Image
          src="/hero-section-photo.jpg"
          alt="Book Photo"
          width={600}
          height={400}
        />
      </div>
    </section>
  );
}
