import Hero from "../components/Home/Hero";
import LoadingBar from "../components/UI/LoadingBar";

import styles from "./page.module.css";

export default function Page() {
  return (
    <main className={styles.main}>
      {/* <LoadingBar width="200" color="#4fa94d" /> */}
      <Hero />
    </main>
  );
}
