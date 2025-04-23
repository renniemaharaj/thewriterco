// components/sword/BookFragment.tsx
import React from "react";
import Book from "../book/Book";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

type BookFragmentProps = {
  book: string;
  title: string;
  onClick: () => void;
};

const BookFragment: React.FC<BookFragmentProps> = ({
  book,
  title,
  onClick,
}) => {
  const eReaderState = useSelector((state: RootState) => state.ereader);

  return (
    <Book
      title={title}
      division={book}
      version="KJV"
      className="!w-[6rem]"
      actionPagesFlipped={
        eReaderState.eContent.title === book && eReaderState.isOpen
      }
      onClick={onClick}
    />
  );
};

export default BookFragment;
