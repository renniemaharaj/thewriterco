import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOrientation } from "../../app/chat/chatSlice";

const Sizer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0].contentRect.width < 768) {
        dispatch(setOrientation("vertical"));
      } else {
        dispatch(setOrientation("horizontal"));
      }
    });

    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, [dispatch]);
  return <div></div>;
};

export default Sizer;
