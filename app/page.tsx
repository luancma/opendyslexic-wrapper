"use client";
import React from "react";
import { useRouter } from "next/navigation";
import "./page.css";

export default function Home() {
  const router = useRouter();

  const handleFetch = async (formData: FormData) => {
    router.push(`/book?url=${formData.get("url")}`);
  };

  // useEffect(() => {
  //   const asyncCallBack = async () => {
  //     const list = await getListOfBooks();
  //     if (list.items) {
  //       setBooks(list.items);
  //     }
  //   };

  //   asyncCallBack();
  // }, []);

  return (
    <div>
      <h1>Page</h1>
      <div>
        <form action={handleFetch}>
          <input name="url" type="URL" placeholder="Marxist url" />
        </form>
      </div>
    </div>
  );
}
