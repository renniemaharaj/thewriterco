import { Box, Text, Button } from "@radix-ui/themes";

export default function NoPage() {
  return (
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
      >
        Go Back Home
      </Button>
    </Box>
  );
}
