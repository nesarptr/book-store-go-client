"use client";

import Home from "../components/Home/Home";
import { Provider } from "react-redux";
import store from "../store";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
        <head />
        <Home>{children}</Home>
      </html>
    </Provider>
  );
}
