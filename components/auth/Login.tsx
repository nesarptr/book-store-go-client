import Link from "next/link";

import LoginForm from "./LoginForm";
import { useAppSelector } from "../../store/hook";

import styles from "./Login.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const router = useRouter();

  useEffect(() => {
    if (isAuth) {
      router.replace("/");
    }
  }, [isAuth, router]);
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
