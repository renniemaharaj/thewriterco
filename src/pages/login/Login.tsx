import Block from "../../components/page/Block";
import { useTransitionNavigation } from "../../components/hooks/useTransitionNavigation";

const Login = () => {
  const { navigateWT } = useTransitionNavigation();
  setTimeout(() => {
    navigateWT("/");
  }, 1000);
  return <Block />;
};

export default Login;
