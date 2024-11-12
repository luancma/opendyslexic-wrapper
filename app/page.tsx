"use client";
import { useEffect, useState } from "react";
import "./page.css";

export default function Home() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function getData(query: string) {
    try {
      const response = await fetch(
        "https://api.allorigins.win/get?url=" + encodeURIComponent(query)
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      setContent(json?.contents);
    } catch (error) {
      console.error(error);
    }
  }

  const handleFetch = async (formData: FormData) => {
    const query = formData.get("url") as string;
    // save in local storage
    window.location.search = query;
  };

  useEffect(() => {
    const url = window.location.search.replace("?", "");
    if (url) {
      setLoading(true);
      getData(url);
    }
  }, []);

  if (loading) {
    <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Page</h1>
      {content ? (
        <div
          className="full-converted-text"
          dangerouslySetInnerHTML={{
            __html: content?.replace(/(<? *script)/gi, "illegalscript"),
          }}
        ></div>
      ) : (
        <div>
          <form action={handleFetch}>
            <input name="url" type="URL" placeholder="Marxist url" />
          </form>
        </div>
      )}
    </div>
  );
}
