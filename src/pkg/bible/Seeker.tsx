import { Box, Button, Card } from "@radix-ui/themes";
import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useRef } from "react";

type SeekerProps = {
  books: string[];
  onClick: (book: string) => void;
};

const Seeker: React.FC<SeekerProps> = ({ books, onClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Box ref={containerRef} className="!pt-2">
      <ul className="text-left text-sm">
        <Card className="blurred-div !flex !gap-2 max-w-[600px] !flex-wrap">
          <AnimatePresence>
            {books.map((book, index) => (
              <motion.div
                initial={{ opacity: 0, maxHeight: 0 }}
                animate={{ opacity: 1, maxHeight: 250 }}
                exit={{ opacity: 0, maxHeight: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Button
                  variant="soft"
                  key={index}
                  onClick={() => {
                    onClick(book);
                  }}
                >
                  {book}
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </Card>
      </ul>
    </Box>
  );
};

export default Seeker;
