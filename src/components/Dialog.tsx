import {
  Button,
  Dialog as _Dialog,
  Flex,
  Inset,
  Table,
  Text,
  TextField,
} from "@radix-ui/themes";
import { memo, useEffect, useRef } from "react";
import { AllowedColors } from "./RadixColors";
import Select, { OptionGroup } from "./Select";

export type DialogTableRow = {
  cells: string[];
};

export type DialogTableView = {
  headers: string[];
  rows: DialogTableRow[];
};

export type AcceptField = {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  value?: string;
  selectFrom?: OptionGroup[];
};

export type DialogProps = {
  open: boolean;
  triggerText: string;
  trigger?: React.ReactNode;
  triggerTextColor?: AllowedColors;
  title: string;
  description: string;
  confirmText?: string;
  confirmColor?: AllowedColors;
  tableView?: DialogTableView;
  acceptFields?: AcceptField[];
  controlledOpen?: boolean;
  onDialogOpenChange?: (open: boolean) => void;
  onConfirm?: (acceptFields?: AcceptField[]) => void;
  onCancel?: () => void;
};

function Dialog({
  open,
  trigger,
  triggerText,
  triggerTextColor,
  title,
  description,
  confirmText,
  confirmColor,
  tableView,
  acceptFields: initialAcceptFields,
  onConfirm,
  onCancel,
}: DialogProps) {
  const acceptFieldsRef = useRef<AcceptField[]>(initialAcceptFields || []); // Store acceptFields in a ref

  const handleFieldChange = (index: number, value: string) => {
    acceptFieldsRef.current = acceptFieldsRef.current.map((field, i) =>
      i === index ? { ...field, value } : field,
    );
  };

  useEffect(() => {
    console.log("Dialog rendered");
  }, []);
  return (
    <_Dialog.Root>
      <_Dialog.Trigger>
        {trigger ? (
          trigger
        ) : (
          <Button color={triggerTextColor || undefined}>{triggerText}</Button>
        )}
      </_Dialog.Trigger>

      <_Dialog.Content maxWidth="450px">
        <_Dialog.Title>{title}</_Dialog.Title>
        <_Dialog.Description size="2" mb="4">
          {description}
        </_Dialog.Description>

        {tableView && (
          <Inset side="x" my="5">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  {tableView.headers.map((header) => (
                    <Table.ColumnHeaderCell key={header}>
                      {header}
                    </Table.ColumnHeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {tableView.rows.map((row, rowIndex) => (
                  <Table.Row key={rowIndex}>
                    {row.cells.map((cell, cellIndex) =>
                      cellIndex === 0 ? (
                        <Table.RowHeaderCell key={cellIndex}>
                          {cell}
                        </Table.RowHeaderCell>
                      ) : (
                        <Table.Cell key={cellIndex}>{cell}</Table.Cell>
                      ),
                    )}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Inset>
        )}

        {acceptFieldsRef.current.length > 0 && (
          <Flex direction="column" gap="3">
            {acceptFieldsRef.current.map((acceptField, index) => (
              <label key={index}>
                <Text as="div" size="2" mb="1" weight="bold">
                  {acceptField.label}
                </Text>
                {acceptField.selectFrom ? (
                  <Select
                    value={acceptField.value || acceptField.defaultValue || ""}
                    groups={acceptField.selectFrom}
                    callback={(selected) => handleFieldChange(index, selected)}
                  />
                ) : (
                  <TextField.Root
                    placeholder={acceptField.placeholder}
                    value={acceptField.value}
                    onChange={(e) => handleFieldChange(index, e.target.value)}
                  />
                )}
              </label>
            ))}
          </Flex>
        )}

        <Flex gap="3" mt="4" justify="end">
          {open && (
            <_Dialog.Close>
              <Button
                variant="soft"
                color="gray"
                onClick={() => {
                  onCancel?.();
                }}
              >
                Cancel
              </Button>
            </_Dialog.Close>
          )}
          <_Dialog.Close>
            <Button
              color={confirmColor || undefined}
              onClick={() => {
                onConfirm?.(acceptFieldsRef.current);
              }}
            >
              {confirmText || "Ok"}
            </Button>
          </_Dialog.Close>
        </Flex>
      </_Dialog.Content>
    </_Dialog.Root>
  );
}

export default memo(Dialog);
