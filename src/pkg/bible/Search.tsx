import { Flex, IconButton, TextField } from "@radix-ui/themes";
import { CircleXIcon } from "lucide-react";
import React, { useEffect } from "react";

const Search = ({ onChange }: { onChange: (str: string) => void }) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  useEffect(() => {
    if (onChange && searchTerm) {
      onChange(searchTerm);
    }
  }, [searchTerm, onChange]);

  return (
    <Flex className="ml-auto flex gap-2 items-center">
      <TextField.Root
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-56"
      />

      {searchTerm && (
        <IconButton
          variant="soft"
          size={"1"}
          className="animate-pulse"
          onClick={() => {
            setSearchTerm("");
            onChange("");
          }}
        >
          <CircleXIcon />
        </IconButton>
      )}
    </Flex>
  );
};

export default Search;
