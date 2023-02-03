"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import axios from "../../axiosConfig";
import LineError from "../error/LineError";

import styles from "./SignupFrom.module.css";
import inputStyles from "./input.module.css";
import { useState } from "react";

const signupFormSchema = yup
  .object({
    firstName: yup
      .string()
      .trim()
      .required("First Name is required")
      .min(3, "First Name has to be atleast 3 character long"),
    lastName: yup.string(),
    email: yup.string().trim().required("Email is required").email(),
    password: yup
      .string()
      .trim()
      .required("Password is required")
      .min(6, "Password has to be atleast 6 character long"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is mendatory")
      .oneOf([yup.ref("password")], "Passwords does not match"),
  })
  .required("invalid value");

export default function SignupForm() {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupFormSchema) });

  const submitHandler = handleSubmit(async (user) => {
    setDisabled(true);
    reset();

    try {
      await axios.post("/auth/signup", {
        name: user.firstName + " " + user.lastName,
        email: user.email,
        password: user.password,
      });
    } catch (err) {
      console.error(err);
      router.push("/error");
    } finally {
      setDisabled(false);
      router.replace("/login");
    }
  });

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      {errors.firstName?.message && (
        <LineError message={errors.firstName.message as string} />
      )}
      <input
        type="text"
        id="first-name"
        placeholder="First Name"
        className={inputStyles.input}
        {...register("firstName")}
      />
      {errors.lastName?.message && (
        <LineError message={errors.lastName.message as string} />
      )}
      <input
        type="text"
        id="last-name"
        placeholder="Last Name"
        className={inputStyles.input}
        {...register("lastName")}
      />
      {errors.email?.message && (
        <LineError message={errors.email.message as string} />
      )}
      <input
        type="email"
        id="email"
        placeholder="Your Email"
        className={inputStyles.input}
        {...register("email")}
      />
      {errors.password?.message && (
        <LineError message={errors.password.message as string} />
      )}
      <input
        type="password"
        id="password"
        placeholder="Your Password"
        className={inputStyles.input}
        {...register("password")}
      />
      {errors.confirmPassword?.message && (
        <LineError message={errors.confirmPassword.message as string} />
      )}
      <input
        type="password"
        id="confirm-password"
        placeholder="Confirm Password"
        className={inputStyles.input}
        {...register("confirmPassword")}
      />
      <button type="submit" className={inputStyles.submit} disabled={disabled}>
        Sign up
      </button>
    </form>
  );
}
