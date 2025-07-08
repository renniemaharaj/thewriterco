import Auth from "../../firebase/auth/Auth";
import Base from "./Base";

const Unauthenticated = () => {
  const config = {
    title: "Private Route",
    description: "This route is private",
    cause: "Please sign in to continue",
  };
  return (
    <Base
      title={config.title}
      description={config.description}
      error={config.description}
      cause={config.cause}
      actions={[<Auth />]}
    />
  );
};

export default Unauthenticated;
