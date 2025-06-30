import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTransitionNavigation } from "../../hooks/useTransitionNavigation";
import { Card } from "@radix-ui/themes";
import { useGitFetchDocument } from "../../hooks/data/gitFetchDocument";

const Item = ({
  urlTab,
  title: itemTitle,
}: {
  urlTab: string;
  title: string;
}) => {
  const { title } = useParams<{ title: string }>();
  const { navigateWT } = useTransitionNavigation();
  const isSelected = title === itemTitle;

  const { content } = useGitFetchDocument({
    fetchPath: urlTab,
    filename: itemTitle,
  });

  // Placeholder states for future update
  const [date, setDate] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

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
    }
  }, [content]);

  return (
    <div
      className="holographic-container cursor-pointer p-2 w-full md:!w-[21rem]"
      onClick={() => {
        if (!isSelected) {
          navigateWT(`/read/${urlTab}/${itemTitle}`);
        }
      }}
    >
      <Card className="holographic-card !p-4 ">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-bold uppercase text-pink-600 truncate">
            {urlTab}
          </span>
          <span className="text-xs font-bold text-green-500 truncate w-[6rem]">
            {date ? (
              date
            ) : (
              <span className="inline-block rounded w-full h-[1rem] animate-pulse"></span>
            )}
          </span>
        </div>

        <h4 className="text-lg font-bold leading-snug truncate">{itemTitle}</h4>

        <p
          className="text-sm mt-1 line-clamp-2"
          style={{ height: "2.5rem", width: "100%", overflow: "hidden" }}
        >
          {description ? (
            description
          ) : (
            <span className="inline-block opacity-5 bg-gray-300 rounded w-full h-full animate-pulse" />
          )}
        </p>
      </Card>
    </div>
  );
};

export default Item;
