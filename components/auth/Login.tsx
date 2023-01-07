import Link from "next/link";

import LoginForm from "./LoginForm";

import styles from "./Login.module.css";

export default function Login() {
  return (
    <div className={styles.main}>
      <p className={styles.signu}>Sign in</p>
      <LoginForm />
      <div className={styles.signb}>
        <Link href={"/signup"}>Sign up</Link>
      </div>
    </div>
  );
}
