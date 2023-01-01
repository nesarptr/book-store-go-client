import Link from "next/link";

import styles from "./Varified.module.css";

export default function Varified() {
  return (
    <div className={styles.div}>
      <p>Your Email is Successfully varified</p>
      <Link href="/" title="Home">
        <span>Home</span>
      </Link>
    </div>
  );
}
