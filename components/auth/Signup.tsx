import React from "react";
import SignupForm from "./SignupForm";

import styles from "./signup.module.css";

export default function Signup() {
  return (
    <div className={styles.main}>
      <p className={styles.signu}>Sign up</p>
      <SignupForm />
      <p className={styles.signb}>Sign in</p>
    </div>
  );
}
