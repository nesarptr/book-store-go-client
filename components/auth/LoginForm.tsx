import React from "react";
import useInput from "../../hooks/use-input";

import styles from "./LoginForm.module.css";
import inputStyles from "./input.module.css";

const isNotEmpty = (value: string): boolean => value.trim() !== "";
const isEmail = (value: string): boolean => {
  let isValid = true;
  if (isNotEmpty(value) && value.includes("@") && value.includes(".")) {
    let values = value.split("@");
    if (values.length === 2) {
      if (isNotEmpty(values[0]) && isNotEmpty(values[1])) {
        values = value.split(".");
        if (values.length >= 2 && isNotEmpty(values[values.length - 1])) {
          isValid = true;
        }
      }
    }
  }
  return isValid;
};
const isPassword = (value: string): boolean => value.trim().length >= 6;

export default function LoginForm() {
  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isPassword);

  return (
    <form className={styles.form}>
      <input
        type="email"
        className={inputStyles.input}
        placeholder="Your Email"
        id="email"
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
      />
      <input
        type="password"
        className={inputStyles.input}
        placeholder="Your Password"
        id="password"
        onChange={passwordChangeHandler}
        onBlur={passwordBlurHandler}
      />
      <button type="submit" className={inputStyles.submit}>
        Sign in
      </button>
    </form>
  );
}
