import { Box, Text, Button } from "@radix-ui/themes";
import Page from "../../components/page/Page";

export default function NoPage() {
  return (
    <Page wrapChildren title="404 Page Not Found" description="Page not found">
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <Text as="div" size="8" color="red">
          404 Page Not Found
        </Text>
        <Text as="p" size="5" color="gray">
          Sorry, the requested page does not exist or cannot be accessed right
          now.
        </Text>
        <Button
          onClick={() => (window.location.href = "/")}
          style={{ marginTop: "20px" }}
          variant="soft"
        >
          Go Back Home
        </Button>
      </Box>
    </Page>
  );
}
