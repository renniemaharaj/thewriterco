import Auth from "../../pkg/firebase/auth/component/Auth";
import Base from "./Base";

const Unauthenticated = () => {
  return (
    <Base
      title="Private Route"
      description="This route is private"
      error="Not Allowed"
      cause="Please sign in to continue"
      actions={[<Auth />]}
    />
  );
};

export default Unauthenticated;
