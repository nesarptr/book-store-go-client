"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "../../axiosConfig";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAppDispatch } from "../../store/hook";
import { login } from "../../store/auth-slice";
import LineError from "../error/LineError";

import styles from "./LoginForm.module.css";
import inputStyles from "./input.module.css";

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
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginFormSchema) });

  const loginHandler = handleSubmit(async (userData) => {
    try {
      const res = await axios.post("/auth/login", {
        email: userData.email,
        password: userData.password,
      });
      Cookies.set("jwtoken", res.data.data.accessToken);
      router.push("/");
      dispatch(
        login({
          isAuth: true,
          jwtoken: res.data.data.accessToken,
          userId: res.data.data.userId,
          userEmail: userData.email,
        })
      );
    } catch (error) {
      console.log(error);
      // router.push("/error");
    } finally {
      reset();
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
      <button type="submit" className={inputStyles.submit}>
        Sign in
      </button>
    </form>
  );
}
