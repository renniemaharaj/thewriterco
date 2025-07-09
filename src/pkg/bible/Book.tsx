import React from "react";
import Book from "../book/Book";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

type BookFragmentProps = {
  book: string;
  title: string;
  showAnimation: boolean;
  onClick: () => void;
};

const BookFragment: React.FC<BookFragmentProps> = ({
  book,
  title,
  onClick,
  showAnimation,
}) => {
  const eReaderState = useSelector((state: RootState) => state.reader);

  return (
    <Book
      title={title}
      division={book}
      version="KJV"
      className="!w-[6rem]"
      showAnimation={showAnimation}
      actionPagesFlipped={
        eReaderState.eBook.title === book && eReaderState.isOpen
      }
      onClick={onClick}
    />
  );
};

export default BookFragment;
