import { useRef, useEffect, useState, useCallback } from "react";
import "./styles.css";

import pageArt from "../../assets/BIBLE_PAGE_ART_V2.jpg";
import { useThemeContext } from "../context/useThemeContext";

export type BookProps = {
  actionPagesFlipped?: boolean;
  title: string;
  titleFontSize?: string;
  division: string;
  divisionFontSize?: string;
  version: string;
  versionFontSize?: string;
  className?: string;
  onOpenClassName?: string;
  onClick?: () => void;
};

export default function Book({
  actionPagesFlipped,
  title,
  titleFontSize,
  division,
  divisionFontSize,
  version,
  versionFontSize,
  className,
  onClick,
}: BookProps) {
  const bookRef = useRef<HTMLDivElement>(null);
  const isBookOpenRef = useRef(false);
  const [isBookOpen, setIsBookOpen] = useState(false); // This ensures re-render

  const { theme } = useThemeContext();

  const cleanupPages = useCallback(() => {
    if (!bookRef.current || isBookOpenRef.current) return;
    returnPages();
  }, []);

  const flipPages = () => {
    if (!bookRef.current) return;
    const pages = bookRef.current.querySelectorAll(".pages");
    const pagesToFlip = Array.from(pages).slice(0, pages.length / 2);

    pagesToFlip.forEach((page, index) => {
      setTimeout(() => page.classList.add("flip"), index * 100);
    });

    setTimeout(() => cleanupPages(), pagesToFlip.length * 100);
  };

  const returnPages = () => {
    if (!bookRef.current) return;
    bookRef.current
      .querySelectorAll(".flip")
      .forEach((page) => page.classList.remove("flip"));
  };

  const openBook = () => {
    isBookOpenRef.current = true;
    setIsBookOpen(true); // Triggers re-render
    flipPages();
  };

  const closeBook = () => {
    isBookOpenRef.current = false;
    setIsBookOpen(false); // Triggers re-render
    returnPages();
  };

  useEffect(() => {
    if (actionPagesFlipped) {
      openBook();
    } else {
      closeBook();
    }
  }, [actionPagesFlipped]);

  return (
    <div
      className={`w-[250px] aspect-[2/3] ${className} transition-all hover:border-2 border-yellow-600`}
    >
      <div
        className="w-full h-[100%] relative book-container m-auto"
        ref={bookRef}
        onClick={onClick}
      >
        <div
          className={`book relative w-full h-full ${isBookOpen ? "open" : ""}`}
          onClick={isBookOpen ? closeBook : openBook}
        >
          <div className="back-cover flex items-center w-full h-full justify-center shadow-[gray] shadow-sm cursor-pointer">
            Back Cover
          </div>
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className="pages w-full h-full bottom-0">
              <img
                src={pageArt}
                alt="page"
                className="w-full h-full border-2 my-auto border-yellow-600"
              />
            </div>
          ))}
          <div
            className={`cursor-default p-1 cover ${theme === "light" ? "bg-gray-400" : "bg-[#111110]"} bg-brown-700 text-white flex flex-col items-center justify-center shadow-2xl text-center`}
          >
            <span
              className="text-md font-bold w-full"
              style={{ fontSize: titleFontSize }}
            >
              {title}
            </span>
            <span
              className="text-md italic w-full"
              style={{ fontSize: divisionFontSize }}
            >
              {division}
            </span>
            <span
              className="text-sm w-full"
              style={{ fontSize: versionFontSize }}
            >
              {version}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
