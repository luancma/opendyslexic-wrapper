"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";


export default function NotFound() {
  useEffect(() => {
    const url = window.location.pathname;
    if (url) {
      window.localStorage.setItem("pathname", url)
    }
  }, []);

  if (window.localStorage.getItem("pathname")) {
    redirect("/");
  }
  return (
    <div>
      <h1>404</h1>
      <p>Page not found</p>
    </div>
  );
}
