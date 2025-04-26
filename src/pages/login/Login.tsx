import Block from "../../pkg/page/Block";
import { useTransitionNavigation } from "../../pkg/hooks/useTransitionNavigation";

const Login = () => {
  const { navigateWT } = useTransitionNavigation();
  setTimeout(() => {
    navigateWT("/");
  }, 1000);
  return <Block />;
};

export default Login;
