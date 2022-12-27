import React from "react";

import styles from "./SignupFrom.module.css";
import inputStyles from "./input.module.css";

export default function SignupForm() {
  return (
    <form className={styles.form}>
      <input
        type="text"
        id="first-name"
        placeholder="First Name"
        className={inputStyles.input}
      />
      <input
        type="text"
        id="last-name"
        placeholder="Last Name"
        className={inputStyles.input}
      />
      <input
        type="email"
        id="email"
        placeholder="Your Email"
        className={inputStyles.input}
      />
      <input
        type="password"
        id="password"
        placeholder="Your Password"
        className={inputStyles.input}
      />
      {/* <label htmlFor="confirm-password">Confirm Password</label> */}
      <input
        type="confirm-password"
        id="confirm-password"
        placeholder="Confirm Password"
        className={inputStyles.input}
      />
      <button type="submit" className={inputStyles.submit}>
        Sign up
      </button>
    </form>
  );
}
