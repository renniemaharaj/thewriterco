import { useMsal } from "@azure/msal-react";
import { Button, Text } from "@radix-ui/themes";
import mssvg from "../assets/microsoft.svg";

interface LoginButtonProps {
  style?: React.CSSProperties;
  className?: string;
}

const LoginButton = ({ style, className }: LoginButtonProps) => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance
      .loginPopup({
        scopes: ["openid", "profile", "email"],
      })
      .then((response) => {
        console.log("Logged in successfully", response);
      })
      .catch((error) => {
        console.error("Login failed", error);
      });
  };

  return (
    <Button
      // variant="classic"
      onClick={handleLogin}
      style={{
        ...style,
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 0px 1px gray",
        // border: "1px solid #8C8C8C",
        padding: "12px",
        minHeight: "41px",
        color: "#3c4043",
        fontWeight: 500,
        fontFamily: "Google Sans,arial,sans-serif",
        cursor: "pointer",
        display: "flex",
      }}
      className={`form_provider-login-button ${className}`}
    >
      <img
        src={mssvg}
        alt="Microsoft logo"
        style={{ marginRight: "10px", transform: "scale(0.9)" }}
      />
      <Text as="span" size="2" style={{ flex: "1" }}>
        Sign in with Microsoft
      </Text>
    </Button>
  );
};
const LogoutButton = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutPopup();
  };

  return <button onClick={handleLogout}>Logout</button>;
};
export { LoginButton, LogoutButton };
