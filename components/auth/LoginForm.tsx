"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "../../axiosConfig";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import jwt_decode from "jwt-decode";

import { useAppDispatch } from "../../store/hook";
import { login } from "../../store/auth-slice";
import LineError from "../error/LineError";

import styles from "./LoginForm.module.css";
import inputStyles from "./input.module.css";
import { useState } from "react";
import { AxiosError } from "axios";

const loginFormSchema = yup
  .object({
    email: yup.string().trim().required("Email is required").email(),
    password: yup
      .string()
      .trim()
      .required("Password is required")
      .min(6, "Password has to be atleast 6 character long"),
  })
  .required("invalid value");

export default function LoginForm() {
  const [disabled, setDisabled] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginFormSchema) });

  const loginHandler = handleSubmit(async (userData) => {
    setDisabled(true);
    reset();
    try {
      const res = await axios.post("/auth/signin", {
        email: userData.email,
        password: userData.password,
      });
      Cookies.set("jwtoken", res.data.token);
      const decoded = jwt_decode(res.data.token) as any;
      dispatch(
        login({
          isAuth: true,
          jwtoken: res.data.token,
          userId: decoded.id,
          userEmail: decoded.email,
        })
      );
    } catch (error) {
      console.error(error);
      const err = error as AxiosError<{ message: string }>;
      setSubmitError(err.response?.data.message as string);
    } finally {
      setDisabled(false);
      router.replace("/");
    }
  });

  return (
    <form className={styles.form} onSubmit={loginHandler}>
      {errors.email?.message && (
        <LineError message={errors.email.message as string} />
      )}
      <input
        type="email"
        className={inputStyles.input}
        placeholder="Your Email"
        id="email"
        {...register("email")}
      />
      {errors.password?.message && (
        <LineError message={errors.password.message as string} />
      )}
      <input
        type="password"
        className={inputStyles.input}
        placeholder="Your Password"
        id="password"
        {...register("password")}
      />
      <button type="submit" className={inputStyles.submit} disabled={disabled}>
        Sign in
      </button>
      {submitError && <LineError message={submitError} />}
    </form>
  );
}
