import { IconButton, TextField } from "@radix-ui/themes";
import { ScanSearchIcon } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";
import Results from "./Results";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../../app/page/pageSlice";

type SearchProps = {
  placeholderOnBlur: string;
  placeHolderOnFocus: string;
  disabled: boolean;
};

const Search = forwardRef(
  ({ placeHolderOnFocus, placeholderOnBlur, disabled }: SearchProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const searchBoxRef = useRef<HTMLInputElement>(null);

    const [localSearchState, setLocalSearchState] = useState("");

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

    const syncReduxSearch = debounce(() => {
      dispatch(setSearchQuery(localSearchState));
    }, 300);

    useEffect(() => {
      syncReduxSearch.cancel();
      syncReduxSearch();
    }, [localSearchState, syncReduxSearch]);
    return (
      <Results>
        <form
          ref={formRef}
          className="hidden md:flex items-center gap-3 max-w-lg"
        >
          <TextField.Root
            ref={searchBoxRef}
            onChange={(e) => setLocalSearchState(e.target.value)}
            disabled={disabled}
            value={localSearchState}
            type="text"
            className="transition-all"
            placeholder={placeholderOnBlur}
            size="2"
          />
          <IconButton
            disabled={disabled}
            type="submit"
            aria-label="Search"
            variant="soft"
          >
            <ScanSearchIcon width="20" height="20" />
          </IconButton>
        </form>
      </Results>
    );
  },
);

export default Search;
