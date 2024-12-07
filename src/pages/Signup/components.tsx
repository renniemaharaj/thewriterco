//Radix UI
import { Box, Flex, Text, TextField } from "@radix-ui/themes";

// Formik useField hook
import { useField } from "formik";

export type FormTextFieldTypes = "text" | "email" | "password";

interface TextComponentProps {
  label: string;
  name: string;
  placeholder: string;
  type: "text" | "email" | "password";
  className?: string;
}

export function FormTextField(props: TextComponentProps) {
  const [field, meta] = useField({ ...props, type: "text" });
  return (
    <Box className={props.className}>
      <Text as="label" weight={"medium"} size={"1"}>
        {props.label}
      </Text>
      <Box className="w-[300px]">
        <TextField.Root size="2" variant="surface" {...field} {...props} />
      </Box>
      {meta.touched && meta.error ? (
        <Text as="p" weight={"medium"} size={"1"} color="red">
          {meta.error}
        </Text>
      ) : null}
    </Box>
  );
}

type CheckBoxComponentProps = {
  children: React.ReactNode;
  name: string;
};
export function FormCheckBox({ children, ...props }: CheckBoxComponentProps) {
  const [field] = useField({ ...props, type: "checkbox" });
  return (
    <Flex m={"1"}>
      <Text as="label" size="2">
        <Flex gap="2">
          <input type="checkbox" {...field} {...props} />
          {children}
        </Flex>
      </Text>
    </Flex>
  );
}
