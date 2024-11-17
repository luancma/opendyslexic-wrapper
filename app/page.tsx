"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import "./page.css";

export default function Home() {
  const textRef = React.useRef<HTMLDivElement>(null);
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

  const handleMouseUp = () => {
    const range = window.getSelection()?.getRangeAt(0);
    if (!range) return;
    const selectionContents = range.extractContents();
    const spanElement = document.createElement("span");
    spanElement.className = "highlight";
    spanElement.appendChild(selectionContents);
    range.insertNode(spanElement);

  };

  useLayoutEffect(() => {
    const current = textRef.current;
    if (!current) return;
    if (current) {
      current.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      if (current) {
        current.removeEventListener("mouseup", handleMouseUp);
      }
    };
  });

 
  if (loading || !content) {
    <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Page</h1>
      {content ? (
        <>
          <div
            className="full-converted-text"
            ref={textRef}
            dangerouslySetInnerHTML={{
              __html: content?.replace(/(<? *script)/gi, "illegalscript"),
            }}
          ></div>
        </>
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
