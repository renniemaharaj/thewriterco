import { Toaster, toast } from "react-hot-toast";
import { ToastProps } from "../../app/toast/types";
import { DEFAULT_DURATION, DEFAULT_POSITION } from "./config";

const Toast = ({ message, success }: ToastProps) => {
  if (success) {
    toast.success(message, {
      duration: DEFAULT_DURATION,
      position: DEFAULT_POSITION,
    });
  } else {
    toast.error(message, {
      duration: DEFAULT_DURATION,
      position: DEFAULT_POSITION,
    });
  }
  return <Toaster />;
};

export default Toast;
