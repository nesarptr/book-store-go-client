"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { useAppDispatch } from "../../store/hook";
import { logout } from "../../store/auth-slice";
import { useEffect } from "react";

export default function Page() {
  Cookies.remove("jwtoken");
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    router.push("/login");
    dispatch(logout());
  }, [dispatch, router]);
  return <div></div>;
}
