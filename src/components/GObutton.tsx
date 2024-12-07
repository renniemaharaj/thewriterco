import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
export default function GOLoginButton() {
  // Handle Google login success
  const handleReactAuthGS = (response: CredentialResponse) => {
    const token = response.credential; // This is the JWT from Google
    console.log("JWT Token:", token);
    // Send the token to your backend or handle it in your frontend
  };

  // Handle Google login failure
  const handleReactAuthGF = () => {
    console.error("Google Login Failed");
  };
  // Styles dictionary
  const stylesDict = {
    "flex-col-cent-gap-1": {
      justify: "center" as const,
      direction: "column" as const,
      align: "center" as const,
      gap: "1",
    },
    "max-w-350-w-300": {
      maxWidth: "350px",
      width: "300px",
    },
    "max-w-400-w-350": {
      maxWidth: "400px",
      width: "350px",
    },
  };
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div
        style={{ ...stylesDict["max-w-350-w-300"] }}
        className="form_provider-login-button"
      >
        <GoogleLogin
          onSuccess={handleReactAuthGS}
          onError={handleReactAuthGF}
          // text="Sign in with Google"
        />
      </div>
    </GoogleOAuthProvider>
  );
}
