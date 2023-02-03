"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { useAppDispatch } from "../../store/hook";
import { logout } from "../../store/auth-slice";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    router.replace("/login");
    Cookies.remove("jwtoken");
    dispatch(logout());
  }, [dispatch, router]);
  return <div></div>;
}
