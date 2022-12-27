import React from "react";
import LoginForm from "./LoginForm";

import styles from "./Login.module.css";

export default function Login() {
  return (
    <div className={styles.main}>
      <p className={styles.signu}>Sign in</p>
      <LoginForm />
      <p className={styles.signb}>Forgot Password? | Sign up</p>
    </div>
  );
}
