// import {
// useDispatch,
//  useSelector } from "react-redux";
import Page from "../../pkg/page/Page";
import Editor from "../../pkg/writer/Editor";
// import { RootState } from "../../app/store";
// import { useCallback } from "react";
// import { setContent } from "../../app/writer/writerSlice";

const Writer = () => {
  // const writer = useSelector((state: RootState) => state.writer);
  // const content = writer.content;
  // const dispatch = useDispatch();

  // const setContentCallback = useCallback(
  //   (content: string) => dispatch(setContent(content)),
  //   [dispatch],
  // );

  return (
    <Page wrapChildren title="Writer" description="Online Writer">
      <Editor
      //  content={content}
      //  setContent={setContentCallback}
      />
    </Page>
  );
};

export default Writer;
