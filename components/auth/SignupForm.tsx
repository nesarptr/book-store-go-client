import React from "react";
import useInput from "../../hooks/use-input";

import styles from "./SignupFrom.module.css";
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

export default function SignupForm() {
  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);
  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);
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
  const {
    value: confirmPassword,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetcConfirmPassword,
  } = useInput((value) => value === password);

  return (
    <form className={styles.form}>
      <input
        type="text"
        id="first-name"
        placeholder="First Name"
        className={inputStyles.input}
        onChange={firstNameChangeHandler}
        onBlur={firstNameBlurHandler}
      />
      <input
        type="text"
        id="last-name"
        placeholder="Last Name"
        className={inputStyles.input}
        onChange={lastNameChangeHandler}
        onBlur={lastNameBlurHandler}
      />
      <input
        type="email"
        id="email"
        placeholder="Your Email"
        className={inputStyles.input}
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
      />
      <input
        type="password"
        id="password"
        placeholder="Your Password"
        className={inputStyles.input}
        onChange={passwordChangeHandler}
        onBlur={passwordBlurHandler}
      />
      <input
        type="confirm-password"
        id="confirm-password"
        placeholder="Confirm Password"
        className={inputStyles.input}
        onChange={confirmPasswordChangeHandler}
        onBlur={confirmPasswordBlurHandler}
      />
      <button type="submit" className={inputStyles.submit}>
        Sign up
      </button>
    </form>
  );
}
