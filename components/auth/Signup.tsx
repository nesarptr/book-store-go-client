import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import SignupForm from "./SignupForm";
import { useAppSelector } from "../../store/hook";

import styles from "./signup.module.css";

export default function Signup() {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const router = useRouter();

  useEffect(() => {
    if (isAuth) {
      router.replace("/");
    }
  }, [isAuth, router]);
  return (
    <div className={styles.main}>
      <p className={styles.signu}>Sign up</p>
      <SignupForm />
      <p className={styles.signb}>
        <Link href={"login"}>Sign in</Link>
      </p>
    </div>
  );
}
