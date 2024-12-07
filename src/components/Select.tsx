import { Select as _Select } from "@radix-ui/themes";
import React, { useEffect } from "react";

/**
 * Option type for the Select component.
 * @typedef {Object} Option
 * @property {string} displayText - Text to display for the option.
 * @property {string} value - Value of the option.
 * @property {boolean} [disabled] - Optional flag to disable the option.
 */
export type Option = {
  displayText: string;
  value: string;
  disabled?: boolean;
};

/**
 * OptionGroup type for the Select component.
 * @typedef {Object} OptionGroup
 * @property {string} displayText - Text to display for the group.
 * @property {Option[]} options - Array of options for the group.
 */
export type OptionGroup = {
  displayText?: string;
  options: Option[];
};
/**
 * Callback type for the Select component.
 * @typedef {Object} Callback
 * @property {number} groupIndex - Index of the group.
 * @property {string} groupDisplayText - Display text of the group.
 * @property {string} optionDisplayText - Display text of the option.
 */
/**
 * SelectProps type for the Select component.
 * @typedef {Object} SelectProps
 * @property {string} [defaultValue] - Optional default value for the select.
 * @property {OptionGroup[]} groups - Array of option groups for the select.
 */
export type SelectProps = {
  defaultValue?: string;
  value?: string;
  groups: OptionGroup[];
  callback?: (selected: string) => void;
};

/**
 *
 * @param props SelectProps
 * @returns The generated Select component.
 */
export default function Select({
  defaultValue,
  value,
  groups,
  callback,
}: SelectProps) {
  const [svalue, setValue] = React.useState<string | undefined>(defaultValue);

  // Required incase react reuses the component
  useEffect(() => {
    setValue(value || defaultValue);
  }, [value, defaultValue]);

  return (
    <_Select.Root
      size={"2"}
      value={svalue}
      onValueChange={(value) => {
        setValue(value);
        callback?.(value);
      }}
    >
      <_Select.Trigger className="relative" />
      <_Select.Content position={"popper"}>
        {groups.map((group, gindex) => (
          <React.Fragment key={"fragment" + gindex}>
            {gindex > 0 && gindex < groups.length && (
              <_Select.Separator key={"separator" + gindex} />
            )}
            <_Select.Group key={"group" + gindex}>
              <_Select.Label key={"label" + gindex}>
                {group.displayText}
              </_Select.Label>
              {group.options.map((option, oindex) => (
                <_Select.Item
                  key={"option" + gindex + "-" + oindex}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.displayText}
                </_Select.Item>
              ))}
            </_Select.Group>
          </React.Fragment>
        ))}
      </_Select.Content>
    </_Select.Root>
  );
}
