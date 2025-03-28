import { Flex, Text, TextField } from "@radix-ui/themes";

const Form = () => {
  return (
    <Flex direction="column" gap="3">
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Display Name
        </Text>
        <TextField.Root placeholder="Enter model display name" />
      </label>

      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          API Key
        </Text>
        <TextField.Root placeholder="Enter API key" />
      </label>

      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Gemini Model
        </Text>
        <TextField.Root placeholder="Enter model identifier" />
      </label>

      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Temperature
        </Text>
        <TextField.Root type="number" placeholder="0.0 - 1.0" step="0.1" />
      </label>

      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Max Tokens
        </Text>
        <TextField.Root type="number" placeholder="Enter max tokens" />
      </label>

      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Top P
        </Text>
        <TextField.Root type="number" placeholder="0.0 - 1.0" step="0.1" />
      </label>

      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Top K
        </Text>
        <TextField.Root type="number" placeholder="Enter top K value" />
      </label>
    </Flex>
  );
};

export default Form;
