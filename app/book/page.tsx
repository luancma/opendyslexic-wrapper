"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "../page.css";

  function BookContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const [content, setContent] = useState("");
  const textRef = React.useRef<HTMLDivElement>(null);

  const handleMouseUp = () => {
    const range = window.getSelection()?.getRangeAt(0);
    if (!range) return;
    const selectionContents = range.extractContents();
    const spanElement = document.createElement("span");
    spanElement.className = "highlight";
    spanElement.appendChild(selectionContents);
    range.insertNode(spanElement);
  };

  // function cleanUrl(url: string) {
  //   return url.replace(/\/[^\/]+\.htm[l]?$/, "");
  // }

  useEffect(() => {
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

  useEffect(() => {
    if (url) {
      fetch("https://api.allorigins.win/get?url=" + encodeURIComponent(url))
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          return response.json();
        })
        .then((json) => {
          setContent(json.contents);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [url]);

  useEffect(() => {
    if (textRef.current) {
      const footer = textRef.current.getElementsByTagName("footer");
      // replace footer with empty string
      if (footer.length) {
        footer[0].innerHTML = `
              <details>
              <summary>Footer</summary>
              ${footer[0].innerHTML}
              </details>
        `;
      }
    }
  }, []);

  return (
      <div
        ref={textRef}
        className="full-converted-text"
        dangerouslySetInnerHTML={{
          __html: content?.replace(/(<? *script)/gi, "illegalscript"),
        }}
      ></div>
  );
}

export default function Book() {
  return (
    <Suspense>
      <BookContent />
    </Suspense>
  );
}