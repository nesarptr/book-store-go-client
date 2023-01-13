"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import axios from "../../axiosConfig";
import { useAppDispatch } from "../../store/hook";
import { logout } from "../../store/auth-slice";
import { useEffect } from "react";

export default function Page() {
  Cookies.remove("jwtoken");
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    router.push("/login");
    axios.delete("/auth/logout");
    dispatch(logout());
  }, [dispatch, router]);
  return <div></div>;
}
