import { useEffect, useState } from "react";

const useDocumentParser = (content: string | null) => {
  const [date, setDate] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!content) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const children = doc.body.children;

    if (children.length >= 4) {
      const firstChildText = children[0]?.textContent?.trim();
      const fourthChildText = children[3]?.textContent?.trim();

      setDate(firstChildText || null);
      setDescription(fourthChildText || null);
    } else {
      setDate(null);
      setDescription(null);
    }

    const firstImg = doc.querySelector("img");
    if (firstImg?.src) {
      setImageUrl(firstImg.src);
    } else {
      setImageUrl(null);
    }
  }, [content]);

  return { date, description, imageUrl };
};

export default useDocumentParser;
