import React from "react";

import styles from "./LoginForm.module.css";
import inputStyles from "./input.module.css";

export default function LoginForm() {
  return (
    <form className={styles.form}>
      <input
        type="email"
        className={inputStyles.input}
        placeholder="Your Email"
        id="email"
      />
      <input
        type="password"
        className={inputStyles.input}
        placeholder="Your Password"
        id="password"
      />
      <button type="submit" className={inputStyles.submit}>
        Sign in
      </button>
    </form>
  );
}
