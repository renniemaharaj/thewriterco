import { Button, DropdownMenu } from "@radix-ui/themes";
import { AllowedColors } from "./RadixColors";
import React from "react";

/**
 * Option type for the Dropdown component.
 * @typedef {Object} Option
 * @property {string} displayText - Text to display for the option.
 * @property {string} [shortcut] - Optional shortcut text for the option.
 * @property {Option[]} [options] - Optional array of options for the option.
 * @property {AllowedColors} [color] - Optional color for the option.
 */
export type Option = {
  displayText: string;
  shortcut?: string;
  options?: Option[];
  color?: AllowedColors;
  disabled?: boolean;
};
/**
 * DropdownProps type for the Dropdown component.
 * @typedef {Object} DropdownProps
 * @property {string} displayText - Text to display on the dropdown trigger button.
 * @property {Option[]} options - Array of options to display in the dropdown.
 * @property {(option: Option) => void} [callback] - Optional callback function to execute on option selection.
 */
export type DropdownProps = {
  displayText: string;
  options: Option[];
  callback?: (option: Option) => void;
};

/**
 *
 * @param type DropdownProps
 * @property {string} displayText - Text to display on the dropdown trigger button.
 * @property {Option[]} options - Array of options to display in the dropdown.
 * @property {(option: Option) => void} [callback] - Optional callback function to execute on option selection.
 */
export default function Dropdown({
  displayText,
  options,
  callback,
}: DropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft">
          {displayText}
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {options.map((option, index_1) =>
          option.options ? (
            <DropdownMenu.Sub key={`sub-${index_1}`}>
              <DropdownMenu.SubTrigger>
                {option.displayText}
              </DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                {option.options?.map((subOption, index_2) => (
                  <React.Fragment key={`subOption-${index_1}-${index_2}`}>
                    <DropdownMenu.Item
                      onClick={() => {
                        callback?.(subOption);
                      }}
                    >
                      {subOption.displayText}
                    </DropdownMenu.Item>
                    {option.options != undefined &&
                    index_2 < option.options.length - 1 &&
                    index_2 % 2 ? (
                      <DropdownMenu.Separator />
                    ) : null}
                  </React.Fragment>
                ))}
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
          ) : (
            <React.Fragment key={`option-${index_1}`}>
              <DropdownMenu.Item
                onClick={() => {
                  callback?.(option);
                }}
                shortcut={option.shortcut}
                color={option.color ? option.color : undefined}
                disabled={option.disabled}
              >
                {option.displayText}
              </DropdownMenu.Item>
              {options != undefined &&
              index_1 < options.length - 1 &&
              index_1 % 2 ? (
                <DropdownMenu.Separator />
              ) : null}
            </React.Fragment>
          ),
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
