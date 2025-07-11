const useCopy = () => {
  const copyText = (s: string) => {
    navigator.clipboard.writeText(s);
  };
  return { copyText };
};
export default useCopy;
