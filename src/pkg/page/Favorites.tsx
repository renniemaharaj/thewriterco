import { Dialog, Flex, Text, Box } from "@radix-ui/themes";
import Button from "../button/Button";
import { ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import {
  removeFavorite,
  setGlobalCurrentChapter,
  setGlobalCurrentVerse,
} from "../../app/ereader/ereaderSlice";
import { Favorite } from "../../app/ereader/types";
import useBible from "../hooks/useBible";

const Favorites = ({ trigger }: { trigger: ReactNode }) => {
  const favorites = useSelector((state: RootState) => state.ereader.favorites);

  const dispatch = useDispatch();

  const { handleBookOpen } = useBible();

  const handleRemove = (title: string) => {
    dispatch(removeFavorite(title));
  };

  const handleDispatch = (fav: Favorite) => {
    handleBookOpen(fav.book).then(() => {
      dispatch(setGlobalCurrentChapter(fav.chapter));
      dispatch(setGlobalCurrentVerse(fav.verse));
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>

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
            favorites.map((fav) => (
              <Box key={fav.title}>
                <Flex justify="between" align="center" gap="3">
                  <Box>
                    <Text size="2" weight="medium">
                      {fav.title}
                    </Text>
                  </Box>
                  <Flex gap="2">
                    <Button variant="soft" onClick={() => handleDispatch(fav)}>
                      {fav.title}
                    </Button>
                    <Button
                      variant="soft"
                      color="red"
                      onClick={() => handleRemove(fav.title)}
                    >
                      Remove
                    </Button>
                  </Flex>
                </Flex>
              </Box>
            ))
          )}
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Close
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Favorites;
