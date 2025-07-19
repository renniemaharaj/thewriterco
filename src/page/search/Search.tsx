import { Flex, IconButton, TextField } from "@radix-ui/themes";
import { ScanSearchIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useCallback, useEffect, useRef } from "react";
import Results from "./Results";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../app/page/pageSlice";
import { useAtom } from "jotai";
import { searchQueryAtom } from "./atoms/search";
import { useTransitionNavigation } from "../../pkg/hooks/useTransitionNavigation";
import Labs from "./labs/Labs";

type SearchProps = {
  placeholderOnBlur: string;
  placeHolderOnFocus: string;
  disabled: boolean;
};

const Search = ({
  placeHolderOnFocus,
  placeholderOnBlur,
  disabled,
}: SearchProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const searchBoxRef = useRef<HTMLInputElement>(null);

  const { navigateWT, path } = useTransitionNavigation();

  const [searchTextQueryAtom, setSearchQueryAtom] = useAtom(searchQueryAtom);

  const dispatch = useDispatch();

  useEffect(() => {
    const searchBox = searchBoxRef.current;
    if (searchBox) {
      const onSearchBoxFocus = (e: Event) => {
        searchBox.style.transition = "width 0.3s";
        searchBox.style.width = "250px";
        searchBox.placeholder = placeHolderOnFocus;
        e.preventDefault();
      };

      const onSearchBoxBlur = (e: Event) => {
        searchBox.style.width = "200px";
        searchBox.placeholder = placeholderOnBlur;
        e.preventDefault();
      };

      searchBox.addEventListener("focus", onSearchBoxFocus);
      searchBox.addEventListener("blur", onSearchBoxBlur);

      return () => {
        searchBox.removeEventListener("focus", onSearchBoxFocus);
        searchBox.removeEventListener("blur", onSearchBoxBlur);
      };
    }
  }, [searchBoxRef, placeHolderOnFocus, placeholderOnBlur]);

  const syncReduxSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
    setSearchQueryAtom(e.target.value);
  };

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      // if (!searchTextQueryAtom) return false;
      // navigateWT("/search/" + searchTextQueryAtom);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchTextQueryAtom, navigateWT],
  );

  return (
    <>
      <Results>
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="hidden md:flex items-center gap-3 max-w-lg"
        >
          <Flex className="gap-2">
            <TextField.Root
              ref={searchBoxRef}
              onChange={syncReduxSearch}
              disabled={disabled}
              value={searchTextQueryAtom}
              type="text"
              className="transition-all"
              placeholder={placeholderOnBlur}
              size="2"
            />

            <IconButton
              disabled={disabled || !searchTextQueryAtom}
              type="submit"
              aria-label="Search"
              variant="soft"
            >
              <ScanSearchIcon width="20" height="20" />
            </IconButton>
          </Flex>
        </form>
      </Results>
      {path.startsWith("daily") && <Labs />}
    </>
  );
};

export default Search;
