import { Dialog, Flex, Text, Box, Button, IconButton } from "@radix-ui/themes";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../app/store";
import { removeFavorite } from "../../../../app/reader/readerSlice";
import Verse from "../../../ai/blocks/Verse";
import { FolderHeart, XIcon } from "lucide-react";

const Favorites = () => {
  const favorites = useSelector((state: RootState) => state.reader.favorites);

  const dispatch = useDispatch();

  const handleRemove = (title: string) => {
    dispatch(removeFavorite(title));
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton variant="soft">
          <FolderHeart />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px" maxHeight="500px">
        <Dialog.Title className="w-full text-center">Favorites</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Manage your favorites
        </Dialog.Description>

        <Flex direction="column" gap="3">
          {favorites.length === 0 ? (
            <Text size="2" color="gray">
              No favorites yet.
            </Text>
          ) : (
            favorites.map((fav, index) => (
              <Box key={fav.title + index}>
                <Flex justify="between" align="center" gap="3">
                  <Verse
                    verse={{
                      book: fav.book,
                      chapterNo: fav.chapter,
                      verseNo: fav.verse,
                      verseContent: "Open this verse",
                    }}
                  />
                  <IconButton
                    variant="soft"
                    color="gray"
                    onClick={() => handleRemove(fav.title)}
                  >
                    <XIcon />
                  </IconButton>
                </Flex>
              </Box>
            ))
          )}
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft">Done</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Favorites;
