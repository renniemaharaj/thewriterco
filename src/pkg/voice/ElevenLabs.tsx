import {
  Button,
  Dialog,
  Flex,
  Switch,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { useEffect, useState } from "react";

import { ElevenLabsState } from "../../app/elevenLabs/types";
import { SetElevenLabs } from "../../app/elevenLabs/eleventLabsSlice";
import useLocalStorage from "../hooks/useLocalStorage";

const ElevenLabs = ({ trigger }: { trigger: React.ReactNode }) => {
  const dispatch = useDispatch();
  const globalSettings = useSelector((state: RootState) => state.elevenLabs);
  const [, setLocalStorageValue] = useLocalStorage<ElevenLabsState>(
    "elevenLabs",
    globalSettings,
  );

  const [apiKeyInput, setApiKeyInput] = useState(globalSettings.apiKey);
  const [enabled, setEnabled] = useState(globalSettings.enabled);

  useEffect(() => {
    setApiKeyInput(globalSettings.apiKey);
    setEnabled(globalSettings.enabled);
  }, [globalSettings]);

  const isValidKey = (key: string) => key.trim().length > 0;

  const handleSave = () => {
    const updated: ElevenLabsState = {
      apiKey: apiKeyInput,
      enabled,
    };
    dispatch(SetElevenLabs(updated));
    setLocalStorageValue(updated);
  };

  const handleCancel = () => {
    setApiKeyInput(globalSettings.apiKey);
    setEnabled(globalSettings.enabled);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>ElevenLabs</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Configure ElevenLabs settings below.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              API Key
            </Text>
            <TextField.Root
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="Enter your ElevenLabs API Key"
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Enable Voice
            </Text>
            <Switch
              disabled
              checked={enabled}
              onCheckedChange={(checked) => setEnabled(checked)}
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" onClick={handleCancel}>
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleSave} disabled={!isValidKey(apiKeyInput)}>
              Save
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ElevenLabs;
